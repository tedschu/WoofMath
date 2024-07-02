import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import React from "react";

import GamePlay from "./components/GamePlay";
import Nav from "./components/Nav";
import ScoreBar from "./components/ScoreBar";
import Slider from "./components/Slider";
import Game from "./pages/Game";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Nav />

      <Routes>
        <Route index element={<Game />} />
        <Route path="/me" element={<Me />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
