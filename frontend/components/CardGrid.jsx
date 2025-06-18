import { Link } from "react-router";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./CardGrid.css";

const CardGrid = () => {
  const { boardId } = useParams();

  const [boardTitle, setBoardTitle] = useState("");
  const [cards, setCards] = useState([]);
  const BACKEND_PORT = 5000;

  useEffect(() => {
    fetchCards();
    fetchBoardTitle();
  }, [boardId]);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `http://localhost:${BACKEND_PORT}/api/boards/${boardId}/cards`
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
        `http://localhost:${BACKEND_PORT}/api/boards/${boardId}`
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
        `http://localhost:${BACKEND_PORT}/api/boards/${boardId}/cards/${id}`,
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

  return (
    <div className="card-grid">
      <h2 className="board-title"> {boardTitle} </h2>

      {cards.map((card) => (
        <article className="card" key={card.id}>
          <Card card={card} onDelete={handleDelete} />
        </article>
      ))}
    </div>
  );
};

export default CardGrid;
