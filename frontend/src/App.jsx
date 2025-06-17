import "./App.css";
import { Routes, Route } from "react-router";
import Header from "../components/Header";
import Home from "../components/Home";
import Footer from "../components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
