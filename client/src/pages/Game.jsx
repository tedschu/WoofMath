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
  //State values for conditional user alerts AND to pass points to DB (if gotRight )
  const [gotRight, setGotRight] = useState(false);
  const [gotWrong, setGotWrong] = useState(false);

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

      <GameSelector
        setGameSelector={setGameSelector}
        setGotRight={setGotRight}
        setGotWrong={setGotWrong}
      />

      <Slider
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
        setGotRight={setGotRight}
        setGotWrong={setGotWrong}
      />

      <GamePlay
        sliderValue={sliderValue}
        gameSelector={gameSelector}
        userScore={userScore}
        setUserScore={setUserScore}
        userInfo={userInfo}
        setTotalScore={setTotalScore}
        totalScore={totalScore}
        gotRight={gotRight}
        gotWrong={gotWrong}
        setGotRight={setGotRight}
        setGotWrong={setGotWrong}
        userBadges={userBadges}
        setUserBadges={setUserBadges}
      />
    </>
  );
}

export default Game;
