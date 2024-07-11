import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

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
  // Needs a function to set badges based on score thresholds
  // If a badge score threshold is met, set badge to "true" in DB and apply badgeEnabled styling
  // Do this via switch statements by point threshold levels? e.g. if (totalScore > 1000) set Hippo to true, apply styling

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
          <div className="eachBadge">
            <FontAwesomeIcon
              icon={faHippo}
              size={"2x"}
              className="badgeEnabled"
            >
              {" "}
            </FontAwesomeIcon>
            <h3>100 (total)</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon icon={faCow} size={"2x"} className="badgeEnabled">
              {" "}
            </FontAwesomeIcon>
            <h3>500 (total)</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon
              icon={faDove}
              size={"2x"}
              className="badgeDisabled"
            >
              {" "}
            </FontAwesomeIcon>
            <h3>500 (in each)</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon
              icon={faFrog}
              size={"2x"}
              className="badgeDisabled"
            >
              {" "}
            </FontAwesomeIcon>
            <h3>2,000</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon
              icon={faFish}
              size={"2x"}
              className="badgeDisabled"
            >
              {" "}
            </FontAwesomeIcon>
            <h3>3,000</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon icon={faCat} size={"2x"} className="badgeDisabled">
              {" "}
            </FontAwesomeIcon>
            <h3>5,000</h3>
          </div>
          <div className="eachBadge">
            <FontAwesomeIcon
              icon={faShieldDog}
              size={"2x"}
              className="badgeDogDisabled"
            >
              {" "}
            </FontAwesomeIcon>
            <h3>10,000</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
