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

function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  <Nav />;

  return (
    <>
      <div>Welcome to WoofMath.</div>
    </>
  );
}

export default App;
