import React from "react";
import { Link } from "react-router-dom";

const SavedPosts = ({ posts = [], savedPosts = [], toggleSave }) => {
  if (!posts) posts = []; // 🔹 Ensure posts is always an array

  const savedPostList = posts.filter((post) => savedPosts.includes(post.id));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔖 Saved Posts</h2>
      <Link to="/" style={styles.homeLink}>🏠 Back to Home</Link>

      {savedPostList.length === 0 ? (
        <p style={styles.noPosts}>No saved posts yet!</p>
      ) : (
        savedPostList.map((post) => (
          <div key={post.id} style={styles.post}>
            <div style={styles.postHeader}>
              <span style={styles.postUser}>👤 {post.user}</span>
            </div>
            <img src={post.image} alt="Post" style={styles.postImage} />
            <div style={styles.postBody}>
              <button
                style={{ ...styles.saveBtn, backgroundColor: "blue" }}
                onClick={() => toggleSave(post.id)}
              >
                🔖 Unsave
              </button>
              <p style={styles.postCaption}><b>{post.user}</b>: {post.caption}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  homeLink: {
    textDecoration: "none",
    fontSize: "18px",
    color: "blue",
    display: "block",
    marginBottom: "15px",
  },
  noPosts: {
    fontSize: "18px",
    color: "#666",
  },
  post: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "15px",
    margin: "15px auto",
    maxWidth: "500px",
    textAlign: "left",
  },
  postHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  postUser: {
    color: "#555",
  },
  postImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  postBody: {
    fontSize: "14px",
    color: "#333",
  },
  saveBtn: {
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    color: "#fff",
  },
  postCaption: {
    fontSize: "14px",
    color: "#444",
  },
};

export default SavedPosts;
