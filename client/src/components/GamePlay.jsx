import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GamePlay() {
  // Logic for difficulty and steps in gameplay (for addition, subtraction, multiplication):
  // 1. Single digit AND single digit
  // 2. Double digit AND single digit
  // 3. Double digit AND double digit
  // 4. [Random] to double digit AND triple digit
  // 5. [Random to double digit] AND [random] to triple digit AND [random] to double digit

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h2>Sounds great. Let's go! [tooltip]</h2>
          <h3>Question [question count]:</h3>

          <div className="questionContainer">
            <div className="questionsBox">54 + 17</div>
            <div className="answerBox"> = ____</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
