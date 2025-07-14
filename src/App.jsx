// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProfileViewer from "../src/components/ProfileViewer"; 

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProfileViewer />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
