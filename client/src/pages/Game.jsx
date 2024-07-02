import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";
import Slider from "../components/Slider";
import GamePlay from "../components/GamePlay";
import GameSelector from "../components/GameSelector";

function Game() {
  return (
    <>
      <ScoreBar />

      <GameSelector />

      <Slider />

      <GamePlay />
    </>
  );
}

export default Game;
