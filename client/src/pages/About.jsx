import React from "react";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="aboutContainer">
        <div className="aboutHeader">
          <Link to={"/"}>
            <img src={woofMathLogo} className="aboutHeaderImg" alt="" />
          </Link>
        </div>
        <h1>Welcome to Woof Math. Here's more about us.</h1>

        <div className="aboutContentContainer">
          <h2>Why the site was made</h2>
        </div>
        <div className="aboutContentContainer">
          <h2>Privacy policy</h2>
        </div>
      </div>
    </>
  );
}

export default About;
