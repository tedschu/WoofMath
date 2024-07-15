import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RecoverModal from "../components/RecoverModal";
import ResetPassModal from "../components/ResetPassModal";

function Login({ setIsLoggedIn, isLoggedIn, userInfo, setUserInfo }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);

  const openRecoverModal = () => setIsRecoverModalOpen(true);
  const closeRecoverModal = () => setIsRecoverModalOpen(false);

  const openResetPassModal = () => setIsResetPassModalOpen(true);
  const closeResetPassModal = () => setIsResetPassModalOpen(false);

  const navigate = useNavigate();

  // Handles form values
  const setFormValues = (event) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
  };

  // Submit button
  const submit = (event) => {
    event.preventDefault();
    //console.log("This is loginForm: ", loginForm);
    loginCheck(userInfo);
  };

  // *************
  // Posts login form data to API AND validates whether user exists
  // Uses isLoggedIn state setter to pass "true" to parent state in App.jsx
  async function loginCheck(userInfo) {
    try {
      const response = await fetch(
        "/auth/login", //path to login (see vite.config)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userInfo.username,
            password: userInfo.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Login failed");
        setLoginFailed(true);
      } else {
        localStorage.setItem("token", data.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
        localStorage.setItem("userId", data.id); // SETS USER ID INTO LOCALSTORAGE TO HELP WITH RENDERING USER DATA ON GAME AND ACCOUNT PAGES
        //setUserId(data.id);
        setIsLoggedIn(true);
        setLoginFailed(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login", error);
      setLoginFailed(true);
    }
  }

  console.log(userInfo);

  return (
    <>
      <div className="loginPageContainer">
        <div className="loginContainer">
          <h2>Hey, you!</h2>
          <p>
            Welcome to WoofMath, a game where you can practice math and earn
            points + super cool animal badges as you go along. The more math you
            do, the more badges you get!
          </p>

          <p>Log in to begin.</p>

          <form action="" className="loginForm" onSubmit={submit}>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              value={userInfo.username}
              onChange={setFormValues}
            />
            <input
              type="password"
              placeholder="Password..."
              name="password"
              value={userInfo.password}
              onChange={setFormValues}
            />
            <button>Log in</button>
          </form>
          {loginFailed && (
            <>
              <h3>Oops. There was a problem with your login.</h3>
              <button onClick={openRecoverModal}>Find my username</button>
              <button onClick={openResetPassModal}>Reset my password</button>

              <RecoverModal
                isRecoverOpen={isRecoverModalOpen}
                onRecoverClose={closeRecoverModal}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />

              <ResetPassModal
                isResetPassOpen={isResetPassModalOpen}
                onResetPassClose={closeResetPassModal}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            </>
          )}

          <h4>
            Wait...I don't have an account! No worries,{" "}
            <Link to={"/register"}>create a free account here. </Link>
          </h4>
        </div>
      </div>
    </>
  );
}

export default Login;
