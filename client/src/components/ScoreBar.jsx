import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { faCat } from "@fortawesome/free-solid-svg-icons";

function ScoreBar({
  isLoggedIn,
  loginForm,
  userScore,
  setUserScore,
  userBadges,
  setUserBadges,
  sliderValue,
  gameSelector,
  userInfo,
  totalScore,
  setTotalScore,
}) {
  return (
    <>
      <div className="scoreBarContainer">
        <div className="scores">
          <div className="totalScores">
            <h3>Your total score is {totalScore}</h3>
          </div>
          <div className="individualScores">
            Addition: {userScore.addition_score} | Subtraction:{" "}
            {userScore.subtraction_score} | Multiplication:{" "}
            {userScore.multiplication_score} | Division:{" "}
            {userScore.division_score}
          </div>
        </div>

        <div className="badges">
          <FontAwesomeIcon icon={faHippo} size={"2x"} className="badgeEnabled">
            {" "}
          </FontAwesomeIcon>
          <FontAwesomeIcon icon={faFrog} size={"2x"} className="badgeEnabled">
            {" "}
          </FontAwesomeIcon>
          <FontAwesomeIcon icon={faDove} size={"2x"} className="badgeDisabled">
            {" "}
          </FontAwesomeIcon>
          <FontAwesomeIcon icon={faCat} size={"2x"} className="badgeDisabled">
            {" "}
          </FontAwesomeIcon>
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
