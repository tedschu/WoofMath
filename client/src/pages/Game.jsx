import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";
import Slider from "../components/Slider";
import GamePlay from "../components/GamePlay";
import GameSelector from "../components/GameSelector";

function Game({
  isLoggedIn,
  loginForm,
  userScore,
  setUserScore,
  userBadges,
  setUserBadges,
  userInfo,
  totalScore,
  setTotalScore,
}) {
  const [sliderValue, setSliderValue] = useState(1);
  const [gameSelector, setGameSelector] = useState("addition");

  return (
    <>
      <ScoreBar
        isLoggedIn={isLoggedIn}
        loginForm={loginForm}
        userScore={userScore}
        setUserScore={setUserScore}
        userBadges={userBadges}
        setUserBadges={setUserBadges}
        sliderValue={sliderValue}
        gameSelector={gameSelector}
        userInfo={userInfo}
        totalScore={totalScore}
        setTotalScore={setTotalScore}
      />

      <GameSelector setGameSelector={setGameSelector} />

      <Slider setSliderValue={setSliderValue} sliderValue={sliderValue} />

      <GamePlay sliderValue={sliderValue} gameSelector={gameSelector} />
    </>
  );
}

export default Game;
