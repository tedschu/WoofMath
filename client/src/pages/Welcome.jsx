import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";

function Welcome() {
  return (
    <>
      <div className="welcomePageContainer">
        <div className="welcomeLogoContainer">
          <img src={woofMathLogo} alt="WoofMath logo" />
        </div>

        <div className="welcomeContentContainer">
          <h1>Woof Math</h1>
          <p>
            Earn points + super cool animal badges as you play a fun math game.
            The more math you do, the more badges you get!
          </p>
          <Link to={"/login"}>
            <button className="welcomeButton login">LOGIN</button>
          </Link>
          <Link to={"/register"}>
            <button className="welcomeButton signup">SIGN UP</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Welcome;
