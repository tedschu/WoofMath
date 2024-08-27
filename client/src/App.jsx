import { useEffect, useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import React from "react";
import GamePlay from "./components/GamePlay";
import Nav from "./components/Nav";
import ScoreBar from "./components/ScoreBar";
import Slider from "./components/Slider";
import Game from "./pages/Game";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import About from "./pages/About";

function App() {
  const storedToken = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [userInfo, setUserInfo] = useState({
    name: "",
    birth_year: "",
    email: "",
    username: "",
    password: "",
    security_question_1: "",
    security_answer_1: "",
    security_question_2: "",
    security_answer_2: "",
  });
  const [userScore, setUserScore] = useState({
    addition_score: 0,
    subtraction_score: 0,
    multiplication_score: 0,
    division_score: 0,
    total_score: 0,
  });
  const [totalScore, setTotalScore] = useState(0);
  const [userBadges, setUserBadges] = useState({
    bernese: false,
    boxer: false,
    cat: false,
    chihuahua: false,
    golden: false,
    husky: false,
    goldendoodle_trophy: false,
  });
  const [token, setToken] = useState(storedToken || "");

  const navigate = useNavigate();

  // Verifies that a user is loggedIn (checks for token)
  // IF token exists: update setters (isLoggedIn, badges, userscore, userId)
  // IF token doesn't exist, navigate to /login

  useEffect(() => {
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      //setUserId(localStorage.getItem("userId"));

      // Gets all relevant user data (user info, scores, badges) and stores in state for usage throughout the app
      const getUserData = async () => {
        try {
          const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          });

          const data = await response.json();

          // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
          if (response.ok) {
            setUserInfo({
              id: data.id,
              username: data.username,
              name: data.name,
              birth_year: data.birth_year,
              email: data.email,
              security_question_1: data.security_question_1,
              security_answer_1: data.security_answer_1,
              security_question_2: data.security_question_2,
              security_answer_2: data.security_answer_2,
            });
            setUserScore(data.score);
            setUserBadges(data.badge);
            setTotalScore(
              parseInt(data.score.addition_score) +
                parseInt(data.score.subtraction_score) +
                parseInt(data.score.multiplication_score) +
                parseInt(data.score.division_score)
            );
          }
          // ADDED TO HANDLE CASE WHERE API CALL IS BAD OR HASN'T COME BACK
          else if (!response.ok) {
            navigate("/welcome");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, [isLoggedIn, token]); // SET TO ISLOGGEDIN TO ENSURE RELOAD POST LOGIN AND REGISTRATION

  return (
    <>
      {/* <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} /> */}

      <Routes>
        <Route
          index
          element={
            <Game
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              setUserScore={setUserScore}
              userBadges={userBadges}
              setUserBadges={setUserBadges}
              totalScore={totalScore}
              setTotalScore={setTotalScore}
            />
          }
        />
        <Route
          path="/me"
          element={
            <Me
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              userScore={userScore}
              totalScore={totalScore}
              userBadges={userBadges}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setToken={setToken}
            />
          }
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about" element={<About isLoggedIn={isLoggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
