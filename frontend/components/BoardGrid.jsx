import "./BoardGrid.css";
import { useState, useEffect, use } from "react";
import Board from "./Board";
import React from "react";
const BACKEND_PORT = 5000 ; // Default to 3000 if not set
const BoardGrid = () => {
  const [showForm, setShowForm] = useState(false);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:${BACKEND_PORT}/api/boards`);
      const data = await response.json();
      setBoards(data); 
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <p>Loading...</p>;
  if (boards.length === 0) return <p>No boards found.</p>;

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:${BACKEND_PORT}/api/boards/${id}`, {
        method: 'DELETE',
      });
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <>
      <section className="board-grid">
        {boards.map((board) => (
          <article className="board-card" key={board.id}>
            <Board board={board} onDelete={handleDelete}/>
          </article>
        ))}
        {/* {boards.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <Board />
          </article>
        ))} */}
      </section>
    </>
  );
};

export default BoardGrid;
