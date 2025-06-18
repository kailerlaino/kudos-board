import { Link } from "react-router";
import { useParams } from "react-router";
import "./Card.css";

const Card = ({card, onDelete}) =>{
    return (
        <>
        <img alt="card gif" src="https://nice"></img>
        <p>{card.content}</p>
        <button className="delete-card" onClick={() => onDelete(card.id)}>Delete Card</button>
        <Link to="/" className="back-link">Back to Home</Link>
        </>
    );
}

export default Card;