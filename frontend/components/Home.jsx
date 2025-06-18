import "./Home.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./Misc/Header";
import SortBy from "./SortForm";
import SearchForm from "./SearchForm";
import CreateBoardForm from "./CreateForms/CreateBoardForm";
import BoardGrid from "./Grids/BoardGrid";
import Footer from "./Misc/Footer";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchBoards();
  }, [selectedCategory, searchQuery]);

  const fetchBoards = async () => {
    setLoading(true);

    try {
      let url = `${BACKEND_URL}/api/boards`;
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      if (selectedCategory === "Recent") { 
        url = `${BACKEND_URL}/api/boards/recent`;
      } else if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/boards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete board");
      }
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <SortBy onCategoryChange={handleCategoryChange} selectedCategory={selectedCategory}/>
      <SearchForm
        onSearch={handleSearch}
        onClear={handleClear}
        currentQuery={searchQuery}
      />
      <button className="create-btn" onClick={toggleForm}>
        Create new board
      </button>
      {showForm && (
        <CreateBoardForm onSuccess={fetchBoards} onClose={toggleForm}/>
      )}
      <BoardGrid loading={loading} boards={boards} onDelete={handleDelete} />
    </>
  );
}

export default Home;
