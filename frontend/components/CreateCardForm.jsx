import React from "react";
import "./CreateCardForm.css";
import { useState } from "react";

function CreateCardForm({ boardId, onSuccess, onClose }) {
  const [cardData, setCardData] = useState({
    title: "",
    content: "",
    author: "",
    gifUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(cardData);
  };

  const createCard = async (cardData) => {
    try {
      console.log("Creating card with data:", cardData);
      const response = await fetch(`http://localhost:5000/api/boards/${boardId}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(cardData),
      });
      if (!response.ok) {
        throw new Error("Failed to create card");
      }
      onSuccess();
      setCardData({ title: "", content: "", author: "", gifUrl: "" });
      onClose();
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };

  return (
    <div className="overlay">
      <form className="new-card-form" onSubmit={handleSubmit}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Create new card</h2>
        <input
          className="card-title-input"
          type="text"
          value={cardData.title}
          placeholder="Enter card title"
          onChange={(e) =>
            setCardData({ ...cardData, title: e.target.value })
          }
          required
        ></input>
        <input
          className="card-content-input"
          type="text"
          value={cardData.content}
          placeholder="Enter card content"
          onChange={(e) =>
            setCardData({ ...cardData, content: e.target.value })
          }
          required
        ></input>
        <input
          className="card-gif-input"
          type="text"
          value={cardData.gifUrl}
          placeholder="Enter GIF URL"
          onChange={(e) =>
            setCardData({ ...cardData, gifUrl: e.target.value })
          }
          required
        ></input>
        <input
          className="card-author-input"
          type="text"
          value={cardData.author}
          placeholder="Enter author (optional)"
          onChange={(e) =>
            setCardData({ ...cardData, author: e.target.value })
          }
        ></input>
        <button type="submit" className="submit">
          Create Card
        </button>
      </form>
    </div>
  );
}

export default CreateCardForm;
