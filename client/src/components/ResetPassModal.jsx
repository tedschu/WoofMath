import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ResetPassModal({
  isResetPassOpen,
  onResetPassClose,
  userInfo,
  setUserInfo,
}) {
  if (!isResetPassOpen) return null;

  const [resetStep, setResetStep] = useState(1);
  const [securityQuestions, setSecurityQuestions] = useState({});

  // Handles form values AND updates loginForm state
  const setFormValues = (event) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
    //console.log(userInfo);
  };

  const usernameSubmit = (event) => {
    event.preventDefault();
    getSecurityQuestions(userInfo);
  };

  // Step 1: takes in a username and returns the security questions
  const getSecurityQuestions = async (userInfo) => {
    try {
      const response = await fetch(`/auth/get-questions/${userInfo.username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSecurityQuestions({
          security_question_1: data.security_question_1,
          security_question_2: data.security_question_2,
        });
        setResetStep(2);
      } else {
        console.error("Error fetching usernames", data);
      }
    } catch (error) {
      //setNoUsers(true);
    }
  };

  const questionsSubmit = (event) => {
    event.preventDefault();
    checkSecurityAnswers(userInfo);
  };

  console.log(userInfo.username);

  async function checkSecurityAnswers(userInfo) {
    try {
      const response = await fetch("/auth/check-answers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.username,
          security_answer_1: userInfo.security_answer_1,
          security_answer_2: userInfo.security_answer_2,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error, status:" ${response.status}`);
      } else {
        setResetStep(3);
      }

      console.log("Response data: ", data);

      //   if (!response.ok) {
      //     throw new Error("Login failed");
      //     setLoginFailed(true);
      //   } else {
      //     localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
      //     localStorage.setItem("userId", data.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
      //     //setUserId(data.id);
      //     setIsLoggedIn(true);
      //     setLoginFailed(false);
      //     navigate("/");
      //   }
    } catch (error) {
      console.error("Error during login", error);
      //setLoginFailed(true);
    }
  }

  //console.log(securityQuestions);

  return (
    <>
      <div className="modalOverlay">
        <div className="modalContent">
          <h2>Let's reset your password.</h2>

          {resetStep === 1 && (
            <form action="" className="registerForm" onSubmit={usernameSubmit}>
              <label htmlFor="name">First, what is your username?</label>
              <input
                type="text"
                placeholder="example: Count Woofula"
                name="username"
                value={userInfo.username}
                onChange={setFormValues}
              />
              <button>Submit</button>
            </form>
          )}

          {resetStep === 2 && (
            <>
              <h3>
                Thanks! Please answer your security questions to reset the
                password:
              </h3>

              <form
                action=""
                className="registerForm"
                onSubmit={questionsSubmit}
              >
                <label htmlFor="security_answer_1">
                  Question 1: {securityQuestions.security_question_1}
                </label>
                <input
                  type="text"
                  placeholder="Answer to question #1..."
                  name="security_answer_1"
                  value={userInfo.security_answer_1}
                  onChange={setFormValues}
                />
                <label htmlFor="security_answer_2">
                  Question 1: {securityQuestions.security_question_2}
                </label>
                <input
                  type="text"
                  placeholder="Answer to question #2..."
                  name="security_answer_2"
                  value={userInfo.security_answer_2}
                  onChange={setFormValues}
                />
                <button>Submit</button>
              </form>
            </>
          )}

          {resetStep === 3 && (
            <>
              <h3>
                Awesome, {userInfo.username}. Please set your new password:
              </h3>
            </>
          )}

          <button className="modalClose" onClick={onResetPassClose}>
            {" "}
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPassModal;
