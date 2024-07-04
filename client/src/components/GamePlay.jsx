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
  //State values for conditional user alerts AND to pass points to DB (if gotRight )
  const [gotRight, setGotRight] = useState(false);
  const [gotWrong, setGotWrong] = useState(false);

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
      setGotRight(true);
      setGotWrong(false);
    } else {
      setGotWrong(true);
      setGotRight(false);
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
          {/* SUBMIT BUTTON */}
          <div className="answerSubmit">
            <button
              className="submitButton"
              onClick={() => {
                findAnswer();
                setSubmitted(true);
              }}
            >
              Submit
            </button>
          </div>

          {/* Prompt based on response goes here (e.g. "yay, you got it right") see MUI components */}
          <div className="answerAlert"></div>
          {gotRight && (
            <div className="rightAnswerAlert">
              <h4>Yay! You got it right!</h4>
            </div>
          )}
          {gotWrong && (
            <div className="wrongAnswerAlert">
              <h4>Oops. Try again!</h4>
            </div>
          )}

          <button className="nextQuestion">Next question, please!</button>

          <button className="saveSession">Done for now. Save!</button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
