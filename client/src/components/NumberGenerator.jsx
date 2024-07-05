import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NumberGenerator({
  sliderValue,
  gameSelector,
  setFirstNumber,
  setSecondNumber,
  setThirdNumber,
  setMathOperator,
  firstNumber,
  secondNumber,
  thirdNumber,
  mathOperator,
  questionCount,
}) {
  // for the division equations specifically
  // Uses an "answer" (ex. 2) and a "multiple" (ex. 5) to generate a result (10)
  const [divNumberAnswer, setDivNumberAnswer] = useState("");
  const [divNumberMultiple, setDivNumberMultiple] = useState("");

  // Function to generate random numbers based on min / max values that can be passed in
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Figures out division random numbers so they divide evenly (e.g. no remainder)
  function getDivisionEquation(answer, multiple) {
    // console.log("This is the answer: ", answer);
    // console.log("This is the multiple: ", multiple);
    let result = answer * multiple;
    // console.log("This is the result: ", result);

    // Ensures that the first number displaying to the user divided by the second number will always divide cleanly
    setFirstNumber(result);
    setSecondNumber(multiple);
  }

  // Ensures getDivisionEquation is called AFTER state values update (ex. divNumberAnswer)
  useEffect(() => {
    if (gameSelector === "division") {
      getDivisionEquation(divNumberAnswer, divNumberMultiple);
    }
  }, [divNumberAnswer, divNumberMultiple, gameSelector, sliderValue]);

  // Sets the math operator (ex. + or -) based on type of game selected (via gameSelector)
  // Updates the random numbers generated based on difficulty level (sliderValue)
  // Numbers become larger (e.g. double- or triple-digit as difficulty level goes up)

  useEffect(() => {
    switch (gameSelector) {
      // ADDITION LOGIC
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
      //SUBTRACTION LOGIC
      case "subtraction":
        setMathOperator("-");
        switch (sliderValue) {
          case 1:
            setFirstNumber(getRandomNumber(5, 9));
            setSecondNumber(getRandomNumber(1, 5));
            break;
          case 2:
            setFirstNumber(getRandomNumber(10, 99));
            setSecondNumber(getRandomNumber(1, 9));
            break;
          case 3:
            setFirstNumber(getRandomNumber(50, 99));
            setSecondNumber(getRandomNumber(1, 49));
            break;
          case 4:
            setFirstNumber(getRandomNumber(100, 999));
            setSecondNumber(getRandomNumber(1, 99));
            break;
          case 5:
            setFirstNumber(getRandomNumber(500, 999));
            setSecondNumber(getRandomNumber(1, 300));
            setThirdNumber(getRandomNumber(1, 200));
            break;
        }
        break;
      // MULTIPLICATION LOGIC
      case "multiplication":
        setMathOperator("*");
        switch (sliderValue) {
          case 1:
            setFirstNumber(getRandomNumber(1, 9));
            setSecondNumber(getRandomNumber(1, 9));
            break;
          case 2:
            // randomly determines whether first or second number is double digit
            if (getRandomNumber(0, 1) === 0) {
              setFirstNumber(getRandomNumber(10, 20));
              setSecondNumber(getRandomNumber(1, 9));
            } else {
              setFirstNumber(getRandomNumber(1, 9));
              setSecondNumber(getRandomNumber(10, 20));
            }
            break;
          case 3:
            setFirstNumber(getRandomNumber(2, 50));
            setSecondNumber(getRandomNumber(2, 50));
            break;
          case 4:
            // randomly determines whether first or second number is triple digit
            if (getRandomNumber(0, 1) === 0) {
              setFirstNumber(getRandomNumber(100, 200));
              setSecondNumber(getRandomNumber(10, 99));
            } else {
              setFirstNumber(getRandomNumber(10, 99));
              setSecondNumber(getRandomNumber(100, 200));
            }
            break;
          case 5:
            // randomly determines whether first or second number is triple digit
            if (getRandomNumber(0, 1) === 0) {
              setFirstNumber(getRandomNumber(1, 100));
              setSecondNumber(getRandomNumber(10, 50));
              setThirdNumber(getRandomNumber(1, 150));
            } else {
              setFirstNumber(getRandomNumber(2, 20));
              setSecondNumber(getRandomNumber(10, 200));
              setThirdNumber(getRandomNumber(1, 50));
            }
            break;
        }
        break;
      // DIVISION LOGIC
      // Goal is to specify two random numbers so that the numbers displayed to user will always divide cleanly (no remainder)
      // So, each case asks for an "answer" (ex. 2) and a "multiple" (ex. 5)
      // The getDivisionEquation function finds the result (10) and assigns firstNumber as the result (10), and secondNumber as the multiple (5)
      // Therefore, the user will always have a "clean" answer (no remainder)
      // See getDivisionEquation comments
      case "division":
        setMathOperator("/");
        switch (sliderValue) {
          case 1:
            setDivNumberAnswer(getRandomNumber(1, 3));
            setDivNumberMultiple(getRandomNumber(2, 5));
            getDivisionEquation(divNumberAnswer, divNumberMultiple);
            break;
          case 2:
            setDivNumberAnswer(getRandomNumber(2, 5));
            setDivNumberMultiple(getRandomNumber(2, 10));
            getDivisionEquation(divNumberAnswer, divNumberMultiple);
            break;
          case 3:
            setDivNumberAnswer(getRandomNumber(5, 10));
            setDivNumberMultiple(getRandomNumber(2, 10));
            getDivisionEquation(divNumberAnswer, divNumberMultiple);
            break;
          case 4:
            setDivNumberAnswer(getRandomNumber(5, 10));
            setDivNumberMultiple(getRandomNumber(10, 20));
            getDivisionEquation(divNumberAnswer, divNumberMultiple);
            break;
          case 5:
            setDivNumberAnswer(getRandomNumber(5, 12));
            setDivNumberMultiple(getRandomNumber(20, 50));
            getDivisionEquation(divNumberAnswer, divNumberMultiple);
            break;
        }
        break;
    }
  }, [sliderValue, gameSelector, questionCount]);

  return (
    <div className="questionsBox">
      {firstNumber} {mathOperator} {secondNumber}
      {sliderValue === 5 && gameSelector != "division" && (
        <>
          {" "}
          {mathOperator} {thirdNumber}{" "}
        </>
      )}
    </div>
  );
}

export default NumberGenerator;
