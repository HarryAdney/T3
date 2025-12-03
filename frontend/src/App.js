import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import People from "./pages/People";
import Places from "./pages/Places";
import Timeline from "./pages/Timeline";
import Archive from "./pages/Archive";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import BishopdaleValley from "./pages/BishopdaleValley";
import Township from "./pages/Township";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/places" element={<Places />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/bishopdale-valley" element={<BishopdaleValley />} />
            <Route path="/townships/:name" element={<Township />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
