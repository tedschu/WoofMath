import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div className="welcomePageContainer">
        <div className="welcomeLogoContainer">
          <img src="../assets/woofmath_logo_1.png" alt="" />
        </div>

        <h1>WoofMath</h1>
      </div>
    </>
  );
}

export default Welcome;
