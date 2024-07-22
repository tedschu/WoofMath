import React from "react";
import { useState, useEffect } from "react";
import NumberGenerator from "./NumberGenerator";
import { useParams } from "react-router-dom";

function GamePlay({
  sliderValue,
  gameSelector,
  userScore,
  setUserScore,
  userInfo,
  gotRight,
  gotWrong,
  setGotRight,
  setGotWrong,
  userBadges,
  setUserBadges,
  totalScore,
  setTotalScore,
}) {
  const [questionCount, setQuestionCount] = useState(1);
  const [mathOperator, setMathOperator] = useState("+");
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [questionResult, setQuestionResult] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
      setGotWrong(false);
      // FUNCTION TO SET USERSCORE WILL GO HERE
      setUserScore((prevScore) => {
        const updatedScores = getUpdatedScores(
          gameSelector,
          addToScore,
          prevScore
        );
        postUserScore(updatedScores);
        setUserAnswer("");
        handleQuestionCount(); // ensures next question loads automatically upon rightAnswer
        setGotRight(true);

        return { ...prevScore, ...updatedScores };
      });
      // Determines whether there is a new qualifying badge, and returns an object (updatedBadges) to pass to API
      const updatedBadges = getUpdatedBadges();
      // IF there is an updatedBadge, sets userBadges state and then posts to DB
      if (Object.keys(updatedBadges).length > 0) {
        setUserBadges((prevBadges) => ({
          ...prevBadges,
          ...updatedBadges,
        }));
        postUserBadges(updatedBadges);
      }
    } else {
      setGotWrong(true);
      setGotRight(false);
    }
  }

  // Function to create an object for the score that's being updated (ex. addition) to pass into body / update DB
  function getUpdatedScores(gameSelector, addToScore, currentScore) {
    const updatedScores = {};
    switch (gameSelector) {
      case "addition":
        updatedScores.addition_score = addToScore + currentScore.addition_score;
        break;
      case "subtraction":
        updatedScores.subtraction_score =
          addToScore + currentScore.subtraction_score;
        break;
      case "multiplication":
        updatedScores.multiplication_score =
          addToScore + currentScore.multiplication_score;
        break;
      case "division":
        updatedScores.division_score = addToScore + currentScore.division_score;
        break;
    }
    return updatedScores;
  }

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserScore = async (updatedScores) => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}/score`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedScores),
      });

      const data = await response.json();

      // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
      if (response.ok) {
        //setUserBadges(data.badge);
        setTotalScore(
          data.addition_score +
            data.subtraction_score +
            data.multiplication_score +
            data.division_score
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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

  // Controls alert when question was right. Visible for 3 seconds.
  useEffect(() => {
    let timer;
    if (gotRight) {
      timer = setTimeout(() => {
        setGotRight(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [gotRight]);

  // Logic for determining when to update userBadges state, run postUserBadges function
  // Passes the value to be updated in postUserBadges (e.g. cow: true)

  function getUpdatedBadges() {
    const updatedBadge = {};

    if (totalScore > 100 && !userBadges.bernese) {
      updatedBadge.bernese = true;
    } else if (totalScore > 500 && !userBadges.chihuahua) {
      updatedBadge.chihuahua = true;
    } else if (totalScore > 1000 && !userBadges.boxer) {
      updatedBadge.boxer = true;
    } else if (
      totalScore > 1000 &&
      userScore.addition_score > 250 &&
      userScore.subtraction_score > 250 &&
      userScore.multiplication_score > 250 &&
      userScore.division_score > 250 &&
      !userBadges.husky
    ) {
      updatedBadge.husky = true;
    } else if (totalScore > 2000 && !userBadges.golden) {
      updatedBadge.golden = true;
    } else if (
      totalScore > 5000 &&
      userScore.addition_score > 500 &&
      userScore.subtraction_score > 500 &&
      userScore.multiplication_score > 500 &&
      userScore.division_score > 500 &&
      !userBadges.cat
    ) {
      updatedBadge.cat = true;
    } else if (totalScore > 10000) {
      updatedBadge.goldendoodle_trophy = true;
      !userBadges.goldendoodle_trophy;
    }
    return updatedBadge;
  }

  // Function to pass the updated score to the database, update scores state values for gameplay
  const postUserBadges = async (updatedBadges) => {
    try {
      // const updatedScores = getUpdatedScores(gameSelector, addToScore);
      const storedToken = localStorage.getItem("token");

      const response = await fetch(`/api/users/${userInfo.id}/badge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(updatedBadges),
      });

      const data = await response.json();
      console.log(data);

      // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
      if (response.ok) {
        //setUserBadges(data.badge);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // console.log(hasNewBadge);

  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h3>
            Here's question #{questionCount} (for
            <span className="pointsHighlight"> {addToScore} points</span>):
          </h3>

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
                setGotRight={setGotRight}
                setGotWrong={setGotWrong}
              />
              <div className="equalSpace">=</div>
              <div className="answerBox">
                <input
                  type="number"
                  placeholder="Your answer..."
                  value={userAnswer}
                  onChange={setAnswer}
                  onWheel={(e) => e.target.blur()}
                  style={{
                    border: "1px solid #ccc",
                    outline: "none",
                    "&:focus": {
                      border: "2px solid #7dc2e0",
                      // boxShadow: "0 0 5px rgba(166, 213, 234, 0.5)",
                    },
                  }}
                />
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <div className="answerSubmit">
              <button
                className="button submit"
                type="submit"
                // autoFocus
              >
                SUBMIT
              </button>
            </div>
          </form>

          {/* Prompt based on response goes here (e.g. "yay, you got it right") see MUI components */}
          <div className="answerAlert"></div>
          {gotRight && (
            <div className="rightAnswerAlert">
              <h4>Yay! You got it right! That's +{addToScore} points!</h4>
            </div>
          )}
          {gotWrong && (
            <div className="wrongAnswerAlert">
              <h4>Oops. Try again!</h4>
            </div>
          )}

          <button className="buttonGrayText" onClick={handleQuestionCount}>
            SKIP QUESTION
          </button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
