import "./Home.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./Header";
import SortBy from "./SortForm";
import SearchForm from "./SearchForm";
import CreateBoardForm from "./CreateBoardForm";
import BoardGrid from "./BoardGrid";
import Footer from "./Footer";

const BACKEND_PORT = 5000; // Default to 5000 if not set

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
      let url = `http://localhost:${BACKEND_PORT}/api/boards`;
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      if (selectedCategory === "Recent") { 
        url = `http://localhost:${BACKEND_PORT}/api/boards/recent`;
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
        `http://localhost:${BACKEND_PORT}/api/boards/${id}`,
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
        <CreateBoardForm onSuccess={fetchBoards} onClose={toggleForm} />
      )}
      <BoardGrid loading={loading} boards={boards} onDelete={handleDelete} />
    </>
  );
}

export default Home;
