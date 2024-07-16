import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";
import Nav from "../components/Nav";

function Me({ userInfo, userScore, totalScore, userBadges, isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
    //navigate("/");
  };

  const navHome = () => {
    navigate("/");
  };

  function handleDelete() {
    const confirmation = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (confirmation) {
      deleteUserAccount();
    }
  }

  const deleteUserAccount = async () => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        handleLogout();
      }
    } catch (error) {
      console.error("Error removing this user:", error);
    }
  };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} />

      <div className="mainContainer">
        <ScoreBar
          userScore={userScore}
          totalScore={totalScore}
          userBadges={userBadges}
        />

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
          <button>Contact us / share feedback</button>

          {isLoggedIn && (
            <>
              <button onClick={handleLogout}>Log out</button>
              <button className="buttonGrayText" onClick={handleDelete}>
                Delete my account
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Me;
