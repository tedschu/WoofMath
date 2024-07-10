import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";

function Me({ userInfo, userScore, totalScore }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.reload();
  };

  return (
    <>
      <ScoreBar userScore={userScore} totalScore={totalScore} />
      My account page
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}

export default Me;
