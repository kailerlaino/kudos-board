import "./Board.css";

const Board = ({board}) => {
  console.log("Board component rendered with board:", board);
  return (
    <>
      <img alt={`board picture`} src={board.imageUrl}></img>
      <h3>{board.title}</h3>
      <p>{board.category}</p>
      <p>{board.author ? board.author : "unknown"}</p>
      <a>View Cards</a>
      <button>Delete Board</button>
    </>
  );
};

export default Board;
