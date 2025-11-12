import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../backend/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Query } from "appwrite";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPostBySlug = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        // Fetch post by slug
        const res = await appwriteService.getPosts([
          Query.equal("slug", slug),
          Query.limit(1),
        ]);

        if (res.total > 0) {
          setPost(res.documents[0]);
        } else {
          navigate("/"); // redirect if not found
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
        toast.error("Failed to fetch post");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPostBySlug();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status && post.featuredImage) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading post...</p>;
  if (!post) return null;

  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <Container>
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Post Image */}
          {post.featuredImage && (
            <div className="relative bg-gray-100">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full max-h-[90vh]"
              />

              {/* Author Controls */}
              {isAuthor && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button className="bg-[#1e5e65] text-white hover:bg-[#184e53]">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={deletePost}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Post Body */}
          <div className="p-8 sm:p-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
