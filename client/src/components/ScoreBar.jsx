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
  // Get user's score and badges from DB
  // Set into state (userScore, userBadges)
  // Post to DB every time there's a submit button, or on "done for now, save" ???

  // // gets user's score from DB
  // useEffect(() => {
  //   async function getUserScoreAndBadges() {
  //     const response = await fetch("/api/users/" + userId, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //   }
  //   getUserScoreAndBadges();
  // }, []);

  return (
    <>
      <div className="scoreBarContainer">
        <div className="scores">
          <div className="totalScores">
            <h3>Your total score is {totalScore}</h3>
          </div>
          <div className="individualScores">
            Addition: 474 | Subtraction: 23 | Multiplication: 0 | Division: 0
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
