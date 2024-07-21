import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import woofMathLogo from "../assets/woofmath_logo_1.png";
import welcomeDog from "../assets/welcome_dog_large.png";
import gameplayPic from "../assets/gameplay.png";
import badge_bernese from "../assets/badges/badge_bernese.png";
import badge_chihuahua from "../assets/badges/badge_chihuahua.png";
import badge_goldendoodle_trophy from "../assets/badges/goldendoodle_trophy_color.png";

function Welcome() {
  return (
    <>
      <div className="welcomePageContainer">
        <div className="welcomeLogoContainer">
          <img
            src={woofMathLogo}
            className="woofMathLogo"
            alt="WoofMath logo"
          />
        </div>

        <div className="welcomeContentContainer">
          <h1>Woof Math</h1>
          <p>
            Earn points + super cool animal badges as you play a fun math game.
            The more math you do, the more badges you get!
          </p>

          <div className="welcomeButtonContainer">
            <Link to={"/login"}>
              <button className="button login">LOGIN</button>
            </Link>
            <Link to={"/register"}>
              <button className="button signup">SIGN UP</button>
            </Link>
          </div>
        </div>

        <div className="welcomeAboutContainer">
          <h1>Learn more about the game...</h1>

          <div className="welcomeSubContainer top">
            <div className="welcomeAboutContent">
              <h2>Woof Math was built to make math practice fun.</h2>
              <p>
                If there are two things every kid loves, it's math and dogs,
                right? Right...?
              </p>
              <p>
                Ok, ok, maybe it's a bit of a stretch. But learning math is,
                well, quite useful, and it can also be fun.
              </p>
              <br />
              <h3>It's made for kids. </h3>
              <p>
                Woof Math is a simple game, built on a simple idea: practice
                math, and keep track of your progress along the way. Start by
                quickly creating a free account. We only ask for the minimal
                info we'd need to make the game work. Check out our privacy
                policy HERE.
              </p>
            </div>
            <div className="welcomeAboutImage top">
              <img src={badge_bernese} alt="" />
              <img src={badge_chihuahua} alt="" />
              <img src={badge_goldendoodle_trophy} alt="" />
            </div>
          </div>

          <div className="welcomeSubContainer bottom">
            <div className="welcomeAboutImage bottom">
              <img src={gameplayPic} alt="" />
            </div>
            <div className="welcomeAboutContent">
              <h2>Here's how it works:</h2>
              <p>
                If there are two things every kid loves, it's math and dogs,
                right? Right...?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
