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
  const [questionResult, setQuestionResult] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Determines the correct answer to the generated question AND stores value in questionResult
  // Compares userAnswer to questionResult to determine if answer is correct
  function findAnswer() {
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
    setQuestionResult(parseInt(result));
  }

  // User input field (answer) results
  const setAnswer = (e) => {
    setUserAnswer(parseInt(e.target.value));
    //console.log(value);
  };

  function checkResult() {
    if (userAnswer === questionResult) {
      console.log("yay, you got it!");
    } else {
      console.log("something's wrong");
    }
  }

  useEffect(() => {
    if (submitted) {
      checkResult();
      setSubmitted(false);
    }
  }, [submitted, userAnswer, questionResult]);

  // console.log("userAnswer: ", userAnswer, typeof userAnswer);
  // console.log("questionResult: ", questionResult, typeof questionResult);

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
              onClick={() => {
                findAnswer();

                setSubmitted(true);
              }}
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
