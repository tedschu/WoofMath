import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn, isLoggedIn, userInfo, setUserInfo }) {
  const [registerError, setRegisterError] = useState(false);

  const navigate = useNavigate();

  const securityQuestions = [
    "What is the name of your pet?",
    "What is your middle name?",
    "What is your favorite ice cream flavor?",
    "What is your lucky number?",
  ];

  // Handles form values AND updates loginForm state
  const setFormValues = (event) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
    //console.log(userInfo);
  };

  // Submit button
  const submit = (event) => {
    event.preventDefault();

    if (
      userInfo.name &&
      userInfo.birth_year &&
      userInfo.email &&
      userInfo.username &&
      userInfo.password
    ) {
      registerUser(userInfo);
      setRegisterError(false);
    } else {
      setRegisterError(true);
    }
  };

  //console.log(userInfo.name);
  // *************
  // Posts login form data to API AND validates whether user exists
  // Uses isLoggedIn state setter to pass "true" to parent state in App.jsx
  async function registerUser(userInfo) {
    try {
      const response = await fetch(
        "/auth/register", //path to register (see vite.config)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userInfo.name,
            birth_year: parseInt(userInfo.birth_year),
            email: userInfo.email,
            username: userInfo.username,
            password: userInfo.password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Registration failed.");
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.user.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        //setUserId(data.id);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  }

  //console.log(loginFailed);

  return (
    <>
      <div className="registerPageContainer">
        <div className="registerContainer">
          <h2>Hey, you!</h2>
          <p>
            Welcome to WoofMath, a game where you can practice math and earn
            points + super cool animal badges as you go along. The more math you
            do, the more badges you get!
          </p>
          <br></br>

          <p>Create a free account below to begin playing. </p>

          <form action="" className="registerForm" onSubmit={submit}>
            <input
              type="text"
              placeholder="Your first name..."
              name="name"
              value={userInfo.name}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="The year you were born..."
              name="birth_year"
              value={userInfo.birth_year}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="Email (or parent's email)..."
              name="email"
              value={userInfo.email}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="Username (what shall we call you)..."
              name="username"
              value={userInfo.username}
              onChange={setFormValues}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={userInfo.password}
              onChange={setFormValues}
            />
            <h3>Please also answer a few security questions.</h3>
            <p>
              Why? If you ever forget your password, you can reset it by
              answering these questions.{" "}
            </p>

            <input
              list="security_question_1"
              type="text"
              placeholder="Security question 1..."
              name="security_question_1"
              value={userInfo.security_question_1}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="Answer to question 1..."
              name="security_answer_1"
              value={userInfo.security_answer_1}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="Security question 2..."
              name="security_question_2"
              value={userInfo.security_question_2}
              onChange={setFormValues}
            />
            <input
              type="text"
              placeholder="Answer to question 2..."
              name="security_answer_2"
              value={userInfo.security_answer_2}
              onChange={setFormValues}
            />
            <button>Create your account</button>
          </form>
          {registerError && (
            <h3 className="registerFail">
              Oops. There was a problem with your registration.
              <br></br>Make sure you've filled out all the fields.
            </h3>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
