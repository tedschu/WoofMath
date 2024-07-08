import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import React from "react";

import GamePlay from "./components/GamePlay";
import Nav from "./components/Nav";
import ScoreBar from "./components/ScoreBar";
import Slider from "./components/Slider";
import Game from "./pages/Game";
import Me from "./pages/Me";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
  });
  const [userId, setUserId] = useState("");
  const [userScore, setUserScore] = useState({
    addition_score: 0,
    subtraction_score: 0,
    multiplication_score: 0,
    division_score: 0,
    total_score: 0,
  });
  const [totalScore, setTotalScore] = useState(0);
  const [userBadges, setUserBadges] = useState({
    dog: false,
    hippo: false,
    shield_dog: false,
    frog: false,
    dove: false,
    cat: false,
    fish: false,
    cow: false,
  });
  const [token, setToken] = useState("");

  // Verifies that a user is loggedIn (checks for token)
  // IF token exists: update setters (isLoggedIn, badges, userscore, userId)
  // IF token doesn't exist, navigate to /login

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setUserId(localStorage.getItem("userId"));

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
          console.log(data);

          // SET ALL STATE VALUES HERE (SCORES, BADGES, USER INFO, ETC.)
          if (response.ok) {
            setUserInfo({
              username: data.username,
              name: data.name,
              birth_year: data.birth_year,
              email: data.email,
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
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserData();
    }
  }, []);

  console.log(totalScore);
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} userInfo={userInfo} />

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
          element={<Me isLoggedIn={isLoggedIn} userInfo={userInfo} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
