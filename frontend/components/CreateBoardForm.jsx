import React from "react";
import "./CreateBoardForm.css";
import { useState } from "react";

function CreateBoardForm({ onClose }) {
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardCategory, setNewBoardCategory] = useState("");
  const [newBoardAuthor, setNewBoardAuthor] = useState("");

  const createNewBoard = () => {
    // TODO, connect backend to component
    console.log("post request to /boards")
  }

  return (
    <div className="overlay">
      <form className="new-board-form">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create new board</h2>
        <label>Title:</label>
        <input
          className="board-title-input"
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          required
        ></input>
        <label>Category</label>
        <select
          value={newBoardCategory}
          onChange={(e) => setNewBoardCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Celebration">"Celebration"</option>
          <option value="Thank You">"Thank You"</option>
          <option value="Inspiration">"Inspiration"</option>
        </select>
        <label>Author:</label>
        <input
          className="board-author-input"
          type="text"
          value={newBoardAuthor}
          onChange={(e) => setNewBoardAuthor(e.target.value)}
          required
        ></input>
        <button className="submit" onClick={createNewBoard}>
          Create Board
        </button>
      </form>
    </div>
  );
}

export default CreateBoardForm;
