import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";

function Me({ userInfo, userScore, totalScore }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  const navHome = () => {
    navigate("/");
  };

  console.log(userInfo);
  return (
    <>
      <ScoreBar userScore={userScore} totalScore={totalScore} />

      <div className="accountPageContainer">
        <h2>Welcome! Here's what you've shared with us:</h2>
        <li>
          Name: <span className="purple">{userInfo.name}</span>
        </li>
        <li>
          Email: <span className="purple">{userInfo.email}</span>
        </li>
        <li>
          Year you were born:{" "}
          <span className="purple">{userInfo.birth_year}</span>
        </li>
        <li>
          Username: <span className="purple">{userInfo.username}</span>
        </li>
        <li>
          Security question #1:{" "}
          <span className="purple">{userInfo.security_question_1}</span>
        </li>
        <li>
          Security answer #1:{" "}
          <span className="purple">{userInfo.security_answer_1}</span>
        </li>
        <li>
          Security question #2:{" "}
          <span className="purple">{userInfo.security_question_2}</span>
        </li>
        <li>
          Security answer #2:{" "}
          <span className="purple">{userInfo.security_answer_2}</span>
        </li>

        <button className="getBackButton" onClick={navHome}>
          Get back to playing!
        </button>
        <button onClick={handleLogout}>Log out</button>
        <button>Change my password</button>
        <button>Contact us / share feedback</button>

        <button className="buttonGrayText">Delete my account</button>
      </div>
    </>
  );
}

export default Me;
