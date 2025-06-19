import { Link } from "react-router";
import React, { useState } from "react";
import CommentModal from "../CommentModal";
import "./Card.css";

const Card = ({ card, onDelete }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [upvotes, setUpvotes] = useState(card.upvotes || 0);
  const [showModal, setShowModal] = useState(false);

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${card.board_id}/cards/${card.id}/upvote`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upvote card");
      }
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h2>{card.title}</h2>
      <img alt="card gif" src={card.gifUrl}></img>
      <p>{card.content}</p>
      <button className="delete-card" onClick={() => onDelete(card.id)}>
        Delete Card
      </button>
      <button className="upvote-card" onClick={handleUpvote}>
        Upvote {upvotes}
      </button>
      <button className="view-comments" onClick={openModal}>
        View Comments
      </button>
      <CommentModal
        card={card}
        boardId={card.board_id}
        isOpen={showModal}
        onClose={closeModal}
      />
    </>
  );
};

export default Card;
