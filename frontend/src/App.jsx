import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Header from "../components/Header";
import SortBy from "../components/SortForm";
import SearchForm from "../components/SearchForm";
import CreateBoardForm from "../components/CreateBoardForm"
import BoardGrid from "../components/BoardGrid";
import Footer from "../components/Footer";

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };


  return (
    <>
      <Header />
      <SortBy />
      <SearchForm />
      <button className="create-btn" onClick={toggleForm}>
        Create new board
      </button>
      {showForm && (
        <CreateBoardForm onClose={toggleForm} />
      )}
      <BoardGrid />
      <Footer />
    </>
  );
}

export default App;
