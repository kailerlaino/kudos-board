import React from "react";
import "./CreateCommentForm.css";
import { useState } from "react";

function CreateCommentForm({ boardId, cardId, onSuccess, onClose }) {
  const [commentData, setCommentData] = useState({
    content: "",
    author: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(commentData);
  };

  const createComment = async (commentData) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards/${cardId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create comment");
      }
      onSuccess();
      setCommentData({ content: "", author: "" });
      onClose();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="overlay">
      <form className="new-comment-form" onSubmit={handleSubmit}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create new comment</h2>
        <label>Title:</label>
        <input
          className="comment-title-input"
          type="text"
          value={commentData.title}
          onChange={(e) =>
            setCommentData({ ...commentData, title: e.target.value })
          }
          required
        ></input>
        <label>Category</label>
        <select
          value={commentData.category}
          onChange={(e) =>
            setCommentData({ ...commentData, category: e.target.value })
          }
          required
        >
          <option value="">Select a category</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>
        <label>Author:</label>
        <input
          className="comment-author-input"
          type="text"
          value={commentData.author}
          onChange={(e) =>
            setCommentData({ ...commentData, author: e.target.value })
          }
        ></input>
        <button type="submit" className="submit">
          Create Comment
        </button>
      </form>
    </div>
  );
}

export default CreateCommentForm;
