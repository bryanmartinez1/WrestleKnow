import React from "react";
import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  // Refreshes Window
  function refresh() {
    window.location.reload(false);
  }

  function navigateTo(link) {
    navigate(link);
  }
  // Log In Function
  const logIn = async function () {
    const user = username;
    const pw = password;
    try {
      const loggedInUser = await Parse.User.logIn(user, pw);
      // logIn returns the corresponding ParseUser object
      console.log(
        `Log In: User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      //Navigates back to Home after Log In
      navigate("/");
      // Refreshes page to update Navbar
      refresh();
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div className="body">
      <div className="holder">
        <div className="title">Log In</div>

        <div className="div-holder">
          <div className="heading">Username</div>
          <input
            type="text"
            id="username"
            className="inputs"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            maxLength="20"
          ></input>
        </div>

        <div className="div-holder">
          <div className="heading">Password</div>
          <input
            type="password"
            id="password"
            className="inputs"
            display="block"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
          ></input>
        </div>
        <div className="div-holder">
          <button className="logInButton" onClick={logIn}>
            Log In
          </button>
        </div>
        <div className="forgot-holder">
          <button
            className="forgot-button"
            onClick={() => navigateTo("/username")}
          >
            Forgot Username?
          </button>
          <button
            className="forgot-button"
            onClick={() => navigateTo("/password")}
          >
            Forgot Password?
          </button>
        </div>
        <div className="div-holder">
          <button
            className="signUpButton"
            onClick={() => navigateTo("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
