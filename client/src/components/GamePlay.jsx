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

  // Binary state value to control whether to run postUserBadge, update DB, and setUserBadges
  const [hasNewBadge, setHasNewBadge] = useState(false);

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
      getUpdatedBadges()
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
      console.log(data);

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
  // (1) specify when hasNewBadge is true based on thresholds, (2) pass the value to be updated in postUserBadges (e.g. cow: true)
  
  
  function getUpdatedBadges() {
    const updatedBadge = {};
    
    if (totalScore > 100 && !userBadges.hippo) {
      updatedBadge.hippo = true;
    } else if (totalScore > 500 && !userBadges.cow) {
      updatedBadge.cow = true;
    } else if (totalScore > 1000 && !userBadges.dove) {
      updatedBadge.dove = true;
    } else if (totalScore > 1000 && userScore.addition_score > 250 && userScore.subtraction_score > 250 && userScore.multiplication_score > 250 && userScore.division_score > 250 && !userBadges.frog) {
      updatedBadge.frog = true;
    } else if (totalScore > 2000 && !userBadges.fish) {
      updatedBadge.fish = true;
    } else if (totalScore > 5000 && userScore.addition_score > 500 && userScore.subtraction_score > 500 && userScore.multiplication_score > 500 && userScore.division_score > 500 && !userBadges.cat) {
      updatedBadge.cat = true;
    } else if (totalScore > 10000) {
      updatedBadge.shield_dog = true;
    }
  }
    
    
    
  }



  return (
    <>
      <div className="gamePlayContainer">
        <div className="gamePlay">
          <h2>Sounds great. Let's go! [tooltip]</h2>
          <h3>
            Here's question #{questionCount} (for {addToScore} points):
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
              <h4>Yay! You got it right! That's +{addToScore} points!</h4>
            </div>
          )}
          {gotWrong && (
            <div className="wrongAnswerAlert">
              <h4>Oops. Try again!</h4>
            </div>
          )}

          <button className="buttonGrayText" onClick={handleQuestionCount}>
            Skip this question
          </button>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
