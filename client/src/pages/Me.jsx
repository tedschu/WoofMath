import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ScoreBar from "../components/ScoreBar";

function Me() {
  return (
    <>
      <ScoreBar />
      My account page
    </>
  );
}

export default Me;
