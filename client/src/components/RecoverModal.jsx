import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RecoverModal({ isOpen, onClose, userInfo, setUserInfo }) {
  if (!isOpen) return null;

  const [returnedUsers, setReturnedUsers] = useState([]);

  // Handles form values AND updates loginForm state
  const setFormValues = (event) => {
    const newObj = { ...userInfo };
    newObj[event.target.name] = event.target.value;
    setUserInfo(newObj);
    //console.log(userInfo);
  };

  const submit = (event) => {
    event.preventDefault();
    getUsernames(userInfo);
  };

  // console.log(userInfo.email);

  const getUsernames = async (userInfo) => {
    try {
      const response = await fetch(`/auth/find-username/${userInfo.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const usernamesArray = data.map((user) => user.username);

        setReturnedUsers(usernamesArray);
      } else {
        console.error("Error fetching usernames", data);
      }
    } catch (error) {}
  };

  console.log(returnedUsers);

  return (
    <>
      <div className="modalOverlay">
        <div className="modalContent">
          <h2>Let's start by finding your account.</h2>
          <form action="" className="registerForm" onSubmit={submit}>
            <label htmlFor="name">
              What was the email used to create the account(s)?
            </label>
            <input
              type="text"
              placeholder="example: name@example.com"
              name="email"
              value={userInfo.email}
              onChange={setFormValues}
            />
            <button>Submit</button>
          </form>

          {returnedUsers.length > 0 ? (
            <div>
              <p>Usernames for this email:</p>
              <ul>
                {returnedUsers.map((username, index) => {
                  <li key={index}>{username}</li>;
                })}
              </ul>
            </div>
          ) : (
            <p> No usernames were found for this email. </p>
          )}

          <button className="modalClose" onClick={onClose}>
            {" "}
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default RecoverModal;
