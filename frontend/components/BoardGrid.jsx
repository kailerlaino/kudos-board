import "./BoardGrid.css";
import Board from "./Board"

const BoardGrid = () => {
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
