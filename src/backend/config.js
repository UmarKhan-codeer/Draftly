import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query, Account } from "appwrite";
import toast from "react-hot-toast"; 

class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client); 
  }

  makeSafeSlug(slug) {
    if (!slug) return undefined;

    let safeSlug = slug.trim().toLowerCase();
    safeSlug = safeSlug.replace(/[^a-z0-9\-_\.]/g, "-");
    safeSlug = safeSlug.replace(/^[^a-z0-9]+/, "");
    safeSlug = safeSlug.substring(0, 36);
    return safeSlug || undefined;
  }

  async createPost({ slug, title, content, featuredImage, status, userId }) {
    const toastId = toast.loading("Posting your story...", {
      style: {
        minWidth: "250px",
        padding: "16px",
        borderRadius: "8px",
        fontSize: "16px",
      },
    });

    try {
      const safeId = this.makeSafeSlug(slug);
      const result = await this.databases.createDocument(
        conf.databaseID,
        conf.collectionId,
        safeId ?? ID.unique(),
        { slug, title, content, featuredImage, status, userId }
      );

      toast.success("Your post has been successfully posted!", {
        id: toastId,
        style: {
          background: "#22c55e", 
          color: "#fff",
        },
      });

      return result;
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
      toast.error("Failed to post: " + error.message, {
        id: toastId,
        style: {
          background: "#ef4444", 
          color: "#fff",
        },
      });

      throw error;
    }
  }

  async updatePost(documentId, { title, content, featuredImage, status }) {
    const toastId = toast.loading("Updating your post...", { style: { minWidth: "250px", padding: "16px", borderRadius: "8px" } });

    try {
      const result = await this.databases.updateDocument(
        conf.databaseID,
        conf.collectionId,
        documentId,
        { title, content, featuredImage, status }
      );

      toast.success("Post updated successfully!", { id: toastId, style: { background: "#22c55e", color: "#fff" } });
      return result;
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
      toast.error("Failed to update post: " + error.message, { id: toastId, style: { background: "#ef4444", color: "#fff" } });
      throw error;
    }
  }

  async deletePost(documentId) {
    const toastId = toast.loading("Deleting post...", { style: { minWidth: "250px", padding: "16px", borderRadius: "8px" } });

    try {
      await this.databases.deleteDocument(conf.databaseID, conf.collectionId, documentId);
      toast.success("Post deleted successfully!", { id: toastId, style: { background: "#22c55e", color: "#fff" } });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
      toast.error("Failed to delete post: " + error.message, { id: toastId, style: { background: "#ef4444", color: "#fff" } });
      return false;
    }
  }

  async getPost(documentId) {
    try {
      return await this.databases.getDocument(conf.databaseID, conf.collectionId, documentId);
    } catch (error) {
      console.error("Appwrite service :: getPost :: error", error);
      toast.error("Failed to fetch post: " + error.message, { style: { background: "#ef4444", color: "#fff" } });
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]) {
    try {
      await this.account.get(); 
      return await this.databases.listDocuments(conf.databaseID, conf.collectionId, queries);
    } catch (error) {
      if (error.code !== 401) {
        console.error("Appwrite service :: getPosts :: error", error);
        toast.error("Failed to fetch posts", { style: { background: "#ef4444", color: "#fff" } });
      } else {
        console.warn("User not logged in. Skipping fetching posts.");
      }
      return []; // Return empty array for guests
    }
  }

  async uploadFile(file) {
    const toastId = toast.loading("Uploading file...", { style: { minWidth: "250px", padding: "16px", borderRadius: "8px" } });

    try {
      const uploadedFile = await this.bucket.createFile(conf.bucketID, ID.unique(), file);
      toast.success("File uploaded!", { id: toastId, style: { background: "#22c55e", color: "#fff" } });
      return uploadedFile;
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      toast.error("Failed to upload file: " + error.message, { id: toastId, style: { background: "#ef4444", color: "#fff" } });
      return null;
    }
  }

  async deleteFile(fileId) {
    const toastId = toast.loading("Deleting file...", { style: { minWidth: "250px", padding: "16px", borderRadius: "8px" } });

    try {
      await this.bucket.deleteFile(conf.bucketID, fileId);
      toast.success("File deleted!", { id: toastId, style: { background: "#22c55e", color: "#fff" } });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
      toast.error("Failed to delete file: " + error.message, { id: toastId, style: { background: "#ef4444", color: "#fff" } });
      return false;
    }
  }

  getFileView(fileId) {
    try {
      return this.bucket.getFileView(conf.bucketID, fileId);
    } catch (error) {
      console.error("Appwrite service :: getFileView :: error", error);
      toast.error("Failed to load file", { style: { background: "#ef4444", color: "#fff" } });
      return null;
    }
  }
}

const service = new Service();
export default service;
