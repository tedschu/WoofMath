import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register({ setIsLoggedIn, isLoggedIn, userInfo, setUserInfo }) {
  const navigate = useNavigate();

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
    registerUser(userInfo);
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
      console.error("Error during login", error);
    }
  }

  //console.log(loginFailed);

  return (
    <>
      <div className="loginPageContainer">
        <div className="loginContainer">
          <h2>Hey, you!</h2>
          <p>
            Welcome to WoofMath, a game where you can practice math and earn
            points + super cool animal badges as you go along. The more math you
            do, the more badges you get!
          </p>

          <p>Create a free account below to begin playing. </p>

          <div className="loginInputs">
            <form action="" className="loginForm" onSubmit={submit}>
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
              <button>Create your account</button>
            </form>
            {/* {loginFailed && <h3>Oops. There was a problem with your login.</h3>} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
