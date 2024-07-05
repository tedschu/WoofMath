import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
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

          <p>Login to begin.</p>

          <div className="loginInputs">
            <input
              type="text"
              placeholder="Username..."
              // value={userAnswer}
              // onChange={setAnswer}
            />
            <input
              type="password"
              placeholder="Password..."
              // value={userAnswer}
              // onChange={setAnswer}
            />
            <button>Log in</button>
          </div>
          <h4>
            Wait...I don't have an account! No worries,{" "}
            <Link to={"/register"}>create a free account here. </Link>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Login;
