import React from "react";
import { useState, useEffect } from "react";
import NumberGenerator from "./NumberGenerator";

function GamePlay({ sliderValue, gameSelector, userScore, setUserScore }) {
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
  // passes to NumberGenerator. Will update with expected value (score) to add to userScore IF the question is answered correctly.
  const [addToScore, setAddToScore] = useState(0);

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
      // FUNCTION TO SET USERSCORE WILL GO HERE
      // Takes in math type and slider states
      // Sets point values based on those states (e.g. addition: 1 equals 5 points, divion: 5 = 12 points)
      // Updates userScore and passes the update to the DB
    } else {
      setGotWrong(true);
      setGotRight(false);
    }
  }

  function addPoints() {
    switch (mathOperator) {
      case "+":
    }
  }

  useEffect(() => {
    if (submitted) {
      checkResult();
      setSubmitted(false);
    }
  }, [submitted, userAnswer, questionResult]);

  // Increments questionCount when user hits "next question"
  // Using functions passed to a setter (rather than directly setting value) ensures that the most
  // up-to-date value of state is used, lessening the need for useEffect dependencies.
  // Use functional updates when your new state depends on the previous state
  function handleQuestionCount() {
    setQuestionCount((prevCount) => prevCount + 1);
    setUserAnswer("");
    setGotRight(false);
    setGotWrong(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    findAnswer();
    setSubmitted(true);
  };

  console.log(
    "This is the userScore: ",
    userScore,
    "This is addToScore: ",
    addToScore
  );
  // console.log("userAnswer: ", userAnswer, typeof userAnswer);
  // console.log("questionResult: ", questionResult, typeof questionResult);

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h2>Sounds great. Let's go! [tooltip]</h2>
          <h3>Question {questionCount}:</h3>

          <form onSubmit={handleSubmit}>
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
                questionCount={questionCount}
                setAddToScore={setAddToScore}
              />
              <div className="equalSpace">
                <h4> = </h4>
              </div>
              <div className="answerBox">
                <input
                  type="number"
                  placeholder="Your answer..."
                  value={userAnswer}
                  onChange={setAnswer}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <div className="answerSubmit">
              <button
                className="submitButton"
                // onClick={() => {
                //   findAnswer();
                //   setSubmitted(true);
                // }}
                type="submit"
                // autoFocus
              >
                Submit
              </button>
            </div>
          </form>

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

          <button className="nextQuestion" onClick={handleQuestionCount}>
            Next question, please!
          </button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
