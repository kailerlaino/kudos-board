import React from "react";
import "./CreateBoardForm.css";
import { useState } from "react";

function CreateBoardForm({ onSuccess, onClose }) {
  const [boardData, setBoardData] = useState({
    title: "",
    category: "",
    author: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    createBoard(boardData);
  };

  const createBoard = async (boardData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(boardData),
      });
      if (!response.ok) {
        throw new Error("Failed to create board");
      }
      onSuccess();
      setBoardData({ title: "", category: "", author: "" });
      onClose();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <div className="overlay">
      <form className="new-board-form" onSubmit={handleSubmit}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create new board</h2>
        <label>Title:</label>
        <input
          className="board-title-input"
          type="text"
          value={boardData.title}
          onChange={(e) =>
            setBoardData({ ...boardData, title: e.target.value })
          }
          required
        ></input>
        <label>Category</label>
        <select
          value={boardData.category}
          onChange={(e) =>
            setBoardData({ ...boardData, category: e.target.value })
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
          className="board-author-input"
          type="text"
          value={boardData.author}
          onChange={(e) =>
            setBoardData({ ...boardData, author: e.target.value })
          }
        ></input>
        <button type="submit" className="submit">
          Create Board
        </button>
      </form>
    </div>
  );
}

export default CreateBoardForm;
