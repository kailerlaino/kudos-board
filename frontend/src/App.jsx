import "./App.css";
import { Routes, Route } from "react-router";
import Header from "../components/Misc/Header";
import Home from "../components/Home";
import CardGrid from "../components/Grids/CardGrid";
import NotFound from "../components/Misc/NotFound";
import Footer from "../components/Misc/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:boardId" element={<CardGrid />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
