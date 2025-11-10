// import conf from "../conf/conf";
// import { Client, Databases, ID, Storage, Query } from "appwrite";

// class Service {
//   client = new Client();
//   databases;
//   bucket;

//   constructor() {
//     this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);
//     this.databases = new Databases(this.client);
//     this.bucket = new Storage(this.client);
//   }

//   makeSafeSlug(slug) {
//     if (!slug) return undefined;

//     let safeSlug = slug.trim().toLowerCase();
//     safeSlug = safeSlug.replace(/[^a-z0-9\-_\.]/g, "-");
//     safeSlug = safeSlug.replace(/^[^a-z0-9]+/, "");
//     safeSlug = safeSlug.substring(0, 36);
//     return safeSlug || undefined;
//   }

//   async createPost({ slug, title, content, featuredImage, status, userId }) {
//     try {
//       const safeId = this.makeSafeSlug(slug);
//       return await this.databases.createDocument(
//         conf.databaseID,
//         conf.collectionId,
//         safeId ?? ID.unique(),
//         { slug, title, content, featuredImage, status, userId }
//       );
//     } catch (error) {
//       console.error("Appwrite service :: createPost :: error", error);
//       throw error;
//     }
//   }

//   async updatePost(documentId, { title, content, featuredImage, status }) {
//     try {
//       return await this.databases.updateDocument(
//         conf.databaseID,
//         conf.collectionId,
//         documentId,
//         { title, content, featuredImage, status }
//       );
//     } catch (error) {
//       console.error("Appwrite service :: updatePost :: error", error);
//       throw error;
//     }
//   }

//   async deletePost(documentId) {
//     try {
//       await this.databases.deleteDocument(
//         conf.databaseID,
//         conf.collectionId,
//         documentId
//       );
//       return true;
//     } catch (error) {
//       console.error("Appwrite service :: deletePost :: error", error);
//       return false;
//     }
//   }

//   async getPost(documentId) {
//     try {
//       return await this.databases.getDocument(
//         conf.databaseID,
//         conf.collectionId,
//         documentId
//       );
//     } catch (error) {
//       console.error("Appwrite service :: getPost :: error", error);
//       return null;
//     }
//   }

//   async getPosts(
//     queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
//   ) {
//     try {
//       return await this.databases.listDocuments(
//         conf.databaseID,
//         conf.collectionId,
//         queries
//       );
//     } catch (error) {
//       console.error("Appwrite service :: getPosts :: error", error);
//       return [];
//     }
//   }

//   async uploadFile(file) {
//     try {
//       const uploadedFile = await this.bucket.createFile(
//         conf.bucketID,
//         ID.unique(),
//         file
//       );
//       return uploadedFile;
//     } catch (error) {
//       console.error("Appwrite service :: uploadFile :: error", error);
//       return null;
//     }
//   }

//   async deleteFile(fileId) {
//     try {
//       await this.bucket.deleteFile(conf.bucketID, fileId);
//       return true;
//     } catch (error) {
//       console.error("Appwrite service :: deleteFile :: error", error);
//       return false;
//     }
//   }

//   getFileView(fileId) {
//     try {
//       return this.bucket.getFileView(conf.bucketID, fileId);
//     } catch (error) {
//       console.error("Appwrite service :: getFileView :: error", error);
//       return null;
//     }
//   }
// }

// const service = new Service();
// export default service;








import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";
import toast from "react-hot-toast"; // ← Import toast

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
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
    // Step 1: show loading toast
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

      // Step 2: success toast
      toast.success("Your post has been successfully posted!", {
        id: toastId,
        style: {
          background: "#22c55e", // emerald green
          color: "#fff",
        },
      });

      return result;
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);

      // Step 2: error toast
      toast.error("Failed to post: " + error.message, {
        id: toastId,
        style: {
          background: "#ef4444", // red
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
      return await this.databases.listDocuments(conf.databaseID, conf.collectionId, queries);
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      toast.error("Failed to fetch posts", { style: { background: "#ef4444", color: "#fff" } });
      return [];
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
