import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function GamePlay({ sliderValue, gameSelector }) {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [mathOperator, setMathOperator] = useState("+");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");

  // Function to generate random numbers based on min / max values that can be passed in
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Sets the math operator (ex. + or -) based on type of game selected (via gameSelector)
  // Updates the random numbers generated based on difficulty level (sliderValue)
  // TODO: CONSIDER MAKING THIS A COMPONENT TO CLEAN UP THE CODE
  useEffect(() => {
    switch (gameSelector) {
      case "addition":
        setMathOperator("+");
        switch (sliderValue) {
          case 1:
            setFirstNumber(getRandomNumber(1, 9));
            setSecondNumber(getRandomNumber(1, 9));
            break;
          case 2:
            // randomly determines whether first or second number is double digit
            if (getRandomNumber(0, 1) === 0) {
              setFirstNumber(getRandomNumber(10, 99));
              setSecondNumber(getRandomNumber(1, 9));
            } else {
              setFirstNumber(getRandomNumber(1, 9));
              setSecondNumber(getRandomNumber(10, 99));
            }
            break;
          case 3:
            setFirstNumber(getRandomNumber(10, 99));
            setSecondNumber(getRandomNumber(10, 99));
            break;
          case 4:
            // randomly determines whether first or second number is triple digit
            if (getRandomNumber(0, 1) === 0) {
              setFirstNumber(getRandomNumber(10, 99));
              setSecondNumber(getRandomNumber(100, 999));
            } else {
              setFirstNumber(getRandomNumber(100, 999));
              setSecondNumber(getRandomNumber(10, 99));
            }
            break;
          case 5:
            setFirstNumber(getRandomNumber(1, 999));
            setSecondNumber(getRandomNumber(1, 999));
            setThirdNumber(getRandomNumber(1, 999));
            break;
        }
        break;
      case "subtraction":
        setMathOperator("-");
        break;
      case "multiplication":
        setMathOperator("*");
        break;
      case "division":
        setMathOperator("/");
        break;
    }
  }, [sliderValue, gameSelector]);

  // Updates the random numbers generated based on difficulty level (sliderValue)

  //  console.log(sliderValue);
  // Logic for difficulty and steps in gameplay (for addition, subtraction, multiplication):
  // 1. Single digit AND single digit
  // 2. Double digit AND single digit
  // 3. Double digit AND double digit
  // 4. [Random] to double digit AND triple digit
  // 5. [Random to double digit] AND [random] to triple digit AND [random] to double digit

  // const firstNumber = Math.round(Math.random() * 10);
  // const secondNumber = Math.round(Math.random() * 100);
  // const thirdNumber = Math.round(Math.random() * 100);

  //console.log("First number: ", firstNumber, " Second number: ", secondNumber);

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h2>Sounds great. Let's go! [tooltip]</h2>
          <h3>Question [question count]:</h3>

          <div className="questionContainer">
            <div className="questionsBox">
              {firstNumber}
              {mathOperator}
              {secondNumber}
              {sliderValue === 5 && mathOperator}
              {sliderValue === 5 && thirdNumber}
            </div>
            <div className="answerBox"> = ____</div>
          </div>
          <div className="answerSubmit">
            <button>Submit</button>
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
