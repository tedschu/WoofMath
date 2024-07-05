import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Handles form values AND updates loginForm state
  const setFormValues = (event) => {
    const newObj = { ...loginForm };
    newObj[event.target.name] = event.target.value;
    setLoginForm(newObj);
    //console.log(loginForm);
  };

  // Submit button
  const submit = (event) => {
    event.preventDefault();
    console.log(loginForm);
    loginCheck(loginForm);
  };

  // *************
  // Posts login form data to API AND validates whether user exists
  // Uses isLoggedIn state setter to pass "true" to parent state in App.jsx
  async function loginCheck(loginForm) {
    const response = await fetch(
      "../../../server/auth/login", //relative path to login (see vite.config)
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      }
    );

    console.log(response);
    // update to await response
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log(result);
    //   console.log(result.token);
    //   <Nav login={true} />;
    //   if (!result.token) {
    //     setloginError(true);
    //   } else {
    //     localStorage.setItem("token", result.token); // SETS TOKEN TO LOCALSTORAGE IN BROWSER
    //     navigate("/");
    //     setloginError(false);
    //   }
    // })
    // .catch(console.error);
  }

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

          <p>Login to begin.</p>

          <div className="loginInputs">
            <form action="" className="loginForm" onSubmit={submit}>
              <input
                type="text"
                placeholder="Username..."
                name="username"
                value={loginForm.username}
                onChange={setFormValues}
              />
              <input
                type="password"
                placeholder="Password..."
                name="password"
                value={loginForm.password}
                onChange={setFormValues}
              />
              <button>Log in</button>
            </form>
          </div>
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
