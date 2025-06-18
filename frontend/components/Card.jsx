import { Link } from "react-router";
import { useParams } from "react-router";
import "./Card.css";

const Card = () =>{
    const { boardId } = useParams();

    return (
        <>
        <h2>Title of Board</h2>
        <img alt="card gif" src="https://nice"></img>
        <p>Board Id: {boardId}</p>
        <p>This will display the card content.</p>
        <Link to="/" className="back-link">Back to Home</Link>
        </>
    );
}

export default Card;