import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";
import Slider from "../components/Slider";
import GamePlay from "../components/GamePlay";

function Game() {
  return (
    <>
      <ScoreBar />

      {/* Buttons for selecting math problems */}

      <div className="gameSelectContainer">
        <h3>What kind of math do you want to play?</h3>
        <div className="gameSelectButtons">
          <button>Addition (+)</button>
          <button>Subtraction (-)</button>
          <button>Multiplication (*)</button>
          <button>Division (%)</button>
        </div>
      </div>

      <Slider />

      <GamePlay />
    </>
  );
}

export default Game;
