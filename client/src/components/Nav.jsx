import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import woofMathLogo from "../assets/woofmath_logo_1.png";

function Nav({ isLoggedIn, userInfo }) {
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <img src={woofMathLogo} alt="" />
        </Link>

        <div className="navTitle">Woof Math</div>

        {isLoggedIn && userInfo && userInfo.username && (
          <Link to={"/me"} className="navUser">
            <h4>Hello, {userInfo.username}!</h4>
          </Link>
        )}

        {/* {!isLoggedIn && (
          <Link to={"/login"} className="navUser">
            <h3>Log in or sign up to play!</h3>
          </Link>
        )} */}
      </nav>
    </>
  );
}

export default Nav;
