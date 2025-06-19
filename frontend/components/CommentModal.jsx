import React, { useState } from "react";
import "./CommentModal.css";
import { useEffect } from "react";

const CommentModal = ({ card, boardId, isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, card]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards/${card.id}/comments`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards/${card.id}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards/${card.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const createdComment = await response.json();
      setComments([...comments, { ...createdComment, author: newAuthor }]);
      setNewComment("");
      setNewAuthor("");
    } catch (error) {
      console.error("Error posting comment:", error);
      return;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="comment-modal-close" onClick={onClose}>
          X
        </button>

        <div className="card-details">
          <img src={card.gifUrl} alt="Card GIF" className="card-gif" />
          <div className="card-info">
            <h3>{card.title}</h3>
            <p className="card-content">{card.content}</p>
            {card.author && <p className="card-author">By: {card.author}</p>}
          </div>
        </div>

        <div className="comments-section">
          <h4>Comments</h4>

          <form className="comment-form" onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Say something..."
              required
            ></textarea>
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Your name (optional)"
            ></input>
            <button type="submit">Post Comment</button>
          </form>
          <div className="comment-list">
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-content">
                      <p>{comment.content}</p>
                      {comment.author && (
                        <span className="comment-author">
                          - {comment.author}
                        </span>
                      )}
                    </div>
                    <button
                      className="delete-comment"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
