import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

function Nav({ isLoggedIn, userInfo }) {
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <FontAwesomeIcon icon={faShieldDog} size={"3x"} />
        </Link>

        <div className="navTitle">Woof Math</div>

        {isLoggedIn && userInfo && userInfo.username && (
          <Link to={"/me"} className="navUser">
            <h3>Hello, {userInfo.username}!</h3>
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
