import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NumberGenerator from "./NumberGenerator";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
            <div className="answerBox">
              <h4> = </h4>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "150px" },
                  backgroundColor: "white",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Your answer..."
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      fontFamily: "Schoolbell",
                      fontSize: "30px",
                    },
                    "& .MuiInputLabel-root": {
                      fontFamily: "Schoolbell",
                      top: "10%",
                    },
                  }}
                />
              </Box>
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
