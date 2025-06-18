import "./Board.css";
import { Link } from "react-router";

const Board = ({ board, onDelete }) => {
  return (
    <>
      <img alt={`board picture`} src={board.imageUrl}></img>
      <h3>{board.title}</h3>
      <p>{board.category}</p>
      <p>{board.author ? board.author : "unknown"}</p>
      <Link to={`/boards/${board.id}`} className="view-board">
        View Board
      </Link>
      <button onClick={() => onDelete(board.id)}>Delete Board</button>
    </>
  );
};

export default Board;
