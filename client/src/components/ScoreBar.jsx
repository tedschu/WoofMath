import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ScoreBar() {
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
