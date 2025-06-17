import "./Home.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "./Header";
import SortBy from "./SortForm";
import SearchForm from "./SearchForm";
import CreateBoardForm from "./CreateBoardForm"
import BoardGrid from "./BoardGrid";
import Footer from "./Footer";

function Home() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  return (
    <>
      <SortBy />
      <SearchForm />
      <button className="create-btn" onClick={toggleForm}>
        Create new board
      </button>
      {showForm && (
        <CreateBoardForm onClose={toggleForm} />
      )}
      <BoardGrid />
    </>
  );
}

export default Home;
