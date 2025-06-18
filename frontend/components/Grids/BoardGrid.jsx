import "./BoardGrid.css";
import Board from "../Containers/Board";
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
