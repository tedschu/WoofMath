import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  return (
    <>
      <nav>
        <Link to={"/"} className="navLogo">
          <FontAwesomeIcon icon={faShieldDog} size={"3x"} />
        </Link>

        <div className="navTitle">WoofMath</div>

        <Link to={"/me"} className="navUser">
          <h3>Hello, Jasper!</h3>
        </Link>
      </nav>
    </>
  );
}

export default Nav;
