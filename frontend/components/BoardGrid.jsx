import "./BoardGrid.css";
import { useState, useEffect } from "react";
import Board from "./Board";
import React from "react";
const BACKEND_PORT = 5000; // Default to 3000 if not set
const BoardGrid = ({ loading, boards, onDelete }) => {
  if (loading) return <p>Loading...</p>;
  if (boards.length === 0) return <p>No boards found.</p>;

  return (
    <>
      <section className="board-grid">
        {boards.map((board) => (
          <article className="board-card" key={board.id}>
            <Board board={board} onDelete={onDelete} />
          </article>
        ))}
      </section>
    </>
  );
};

export default BoardGrid;
