import { Link } from "react-router";
import { useParams } from "react-router";
import Card from "./Card";
import "./CardGrid.css";

const CardGrid = () =>{
    const { boardId } = useParams();

    return (
        <div className="card-grid">
            <Card />
        </div>
    );
}

export default CardGrid;