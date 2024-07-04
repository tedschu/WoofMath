import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NumberGenerator from "./NumberGenerator";
import Box from "@mui/material/Box";

function GamePlay({ sliderValue, gameSelector }) {
  const [questionCount, setQuestionCount] = useState(1);
  const [mathOperator, setMathOperator] = useState("+");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

  function findAnswer(firstNumber, secondNumber, thirdNumber, mathOperator) {
    let result;

    switch (mathOperator) {
      case "+":
        result = firstNumber + secondNumber;
        if (thirdNumber && sliderValue === 5) result += thirdNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        if (thirdNumber && sliderValue === 5) result -= thirdNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        if (thirdNumber && sliderValue === 5) result *= thirdNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
    }

    console.log("The result is: ", result);
    // console.log("Third: ", thirdNumber);
  }

  // User input field (answer) results
  const setAnswer = (e) => {
    setUserAnswer(e.target.value);
    //console.log(value);
  };

  console.log(userAnswer);

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h2>Sounds great. Let's go! [tooltip]</h2>
          <h3>Question {questionCount}:</h3>

          <div className="questionContainer">
            <NumberGenerator
              sliderValue={sliderValue}
              gameSelector={gameSelector}
              setFirstNumber={setFirstNumber}
              setSecondNumber={setSecondNumber}
              setThirdNumber={setThirdNumber}
              setMathOperator={setMathOperator}
              firstNumber={firstNumber}
              secondNumber={secondNumber}
              thirdNumber={thirdNumber}
              mathOperator={mathOperator}
            />
            <div className="equalSpace">
              <h4> = </h4>
            </div>
            <div className="answerBox">
              <input
                type="number"
                placeholder="Your answer..."
                onChange={setAnswer}
              />
            </div>
          </div>
          <div className="answerSubmit">
            <button
              onClick={() =>
                findAnswer(firstNumber, secondNumber, thirdNumber, mathOperator)
              }
            >
              Submit
            </button>
          </div>

          {/* Prompt based on response goes here (e.g. "yay, you got it right") see MUI components */}
          <h4>prompt here</h4>
          <br />

          <div className="endSession">
            <button>Done for now. Save!</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
