import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ScoreBar({
  isLoggedIn,
  loginForm,
  userScore,
  setUserScore,
  userBadges,
  setUserBadges,
  sliderValue,
  gameSelector,
  userId,
}) {
  // Get user's score and badges from DB
  // Set into state (userScore, userBadges)
  // Post to DB every time there's a submit button, or on "done for now, save" ???

  // gets user's score from DB
  useEffect(() => {
    async function getUserScoreAndBadges() {
      const response = await fetch("/api/users/" + userId, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    }
    getUserScoreAndBadges();
  }, []);

  return (
    <>
      <div className="scoreBarContainer">
        <div className="scores">Scores</div>

        <div className="badges">Badges</div>
      </div>
    </>
  );
}

export default ScoreBar;
