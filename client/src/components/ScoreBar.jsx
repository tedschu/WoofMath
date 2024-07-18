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
import badge_bernese from "../assets/badges/badge_bernese.png";
import badge_chihuahua from "../assets/badges/badge_chihuahua.png";
import badge_boxer from "../assets/badges/badge_boxer.png";
import badge_husky from "../assets/badges/badge_husky.png";
import badge_golden from "../assets/badges/badge_golden.png";
import badge_cat from "../assets/badges/badge_cat.png";
import badge_goldendoodle_trophy from "../assets/badges/goldendoodle_trophy_color.png";

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

        <div className="badgesContainer">
          <div className="eachBadge">
            <img
              src={badge_bernese}
              alt=""
              className={userBadges.bernese ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>100</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_chihuahua}
              alt=""
              className={
                userBadges.chihuahua ? "badgeEnabled" : "badgeDisabled"
              }
            />
            <h3>500</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_boxer}
              alt=""
              className={userBadges.boxer ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>1,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_husky}
              alt=""
              className={userBadges.husky ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>1,000 E</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_golden}
              alt=""
              className={userBadges.golden ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>2,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_cat}
              alt=""
              className={userBadges.cat ? "badgeEnabled" : "badgeDisabled"}
            />
            <h3>5,000</h3>
          </div>
          <div className="eachBadge">
            <img
              src={badge_goldendoodle_trophy}
              alt=""
              className={
                userBadges.goldendoodle_trophy
                  ? "badgeEnabled"
                  : "badgeDisabled"
              }
            />
            <h3>10,000</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreBar;
