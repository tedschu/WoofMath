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
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [userId, setUserId] = useState("");
  const [userScore, setUserScore] = useState(0);
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

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true);
  //     setToken(localStorage.getItem("token"));
  //     setUserId(localStorage.getItem("userId"));
  //     getUserData();
  //   }
  // }, []);

  // const getUserData = async () => {
  //   try {
  //   } catch (error) {}
  // };

  return (
    <>
      <Nav isLoggedIn={isLoggedIn} loginForm={loginForm} />

      <Routes>
        <Route
          index
          element={
            <Game
              isLoggedIn={isLoggedIn}
              loginForm={loginForm}
              userScore={userScore}
              setUserScore={setUserScore}
              userBadges={userBadges}
              setUserBadges={setUserBadges}
              userId={userId}
            />
          }
        />
        <Route path="/me" element={<Me />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              loginForm={loginForm}
              setLoginForm={setLoginForm}
              setUserId={setUserId}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
