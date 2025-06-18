import { Link } from "react-router";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Card from "../Containers/Card";
import CreateCardForm from "../CreateForms/CreateCardForm";
import "./CardGrid.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CardGrid = () => {
  const { boardId } = useParams();
  const [boardTitle, setBoardTitle] = useState("");
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
    fetchBoardTitle();
  }, [boardId]);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cards");
      }
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const fetchBoardTitle = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch board");
      }
      const data = await response.json();
      setBoardTitle(data.title);
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${boardId}/cards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete board");
      }
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    
    <div className="card-grid">
      <Link to="/" className="back-link">
        Back to Boards
      </Link>
      <h2 className="board-title"> {boardTitle} </h2>
      <button className="create-btn" onClick={toggleForm}>
        Create new card
      </button>
      {showForm && (
        <CreateCardForm boardId={boardId} onSuccess={fetchCards} onClose={toggleForm} />
      )}
      {cards.map((card) => (
        <article className="card" key={card.id}>
          <Card card={card} onDelete={handleDelete} />
        </article>
      ))}
    </div>
  );
};

export default CardGrid;
