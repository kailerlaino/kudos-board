import "./BoardGrid.css";
import {useState} from "react"
import Board from "./Board";
import React from "react";

const BoardGrid = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //   if (loading && boards.length === 0) {
  //     return (
  //       <>
  //         <p>loading...</p>
  //       </>
  //     );
  //   }

  //   if (boards.length === 0) {
  //     return (
  //       <>
  //         <p>No movies Found</p>
  //       </>
  //     );
  //   }
  return (
    <>
      <section className="board-grid">
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
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
