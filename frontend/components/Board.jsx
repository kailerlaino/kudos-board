import "./Board.css";

const Board = () => {
  return (
    <>
    <article className="board-card">
      <img alt={`board picture`} src={"https://picsum.photos/200"}></img>
      <h3>Board Title</h3>
      <p>Board Type</p>
      <a>View Cards</a>
      <button>Delete Board</button>
    </article>
    </>
  );
};

export default Board;
