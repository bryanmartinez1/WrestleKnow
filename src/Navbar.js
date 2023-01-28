import "./styles/navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

// Images for navbar
import boston_crab from "./images/boston_crab.png";
import wrestler from "./images/mask_icon.png";
import title from "./images/title_icon.png";
import company from "./images/company_icon.png";
import faction from "./images/faction_icon.png";
import profile from "./images/profile_icon.png";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  // Gets Current User
  getCurrentUser();

  // Logs Out Current User
  const logOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        console.log("Log Out: No user is logged in anymore!");
      }
      // Update state variable holding current user
      getCurrentUser();
      closeDrop();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  // Functions to Open and Close Dropdown
  var dropOpened = false;
  //Function to Open Dropdown
  function openDrop() {
    document.getElementById("drop").style.display = "block";
    dropOpened = true;
  }
  //Function to Close Dropdown
  function closeDrop() {
    document.getElementById("drop").style.display = "none";
    dropOpened = false;
  }
  //puts the two together
  function dropOpenClose() {
    if (dropOpened === false) {
      openDrop();
    } else {
      closeDrop();
    }
  }

  let checkLogIn;
  if (currentUser === null) {
    checkLogIn = (
      <div class="content-box" id="drop">
        <Link to="/login" onClick={() => closeDrop()}>
          Log In
        </Link>
        <Link to="/signup" onClick={() => closeDrop()}>
          Sign Up
        </Link>
      </div>
    );
  } else {
    checkLogIn = (
      <div class="content-box" id="drop">
        <Link to="/account" onClick={() => closeDrop()}>
          Account
        </Link>
        <Link to="/gorillaposition" onClick={() => closeDrop()}>
          Gorilla Position
        </Link>
        <Link to="/" onClick={() => logOut()}>
          Log Out
        </Link>
      </div>
    );
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-name" onClick={() => closeDrop()}>
        WrestleKnow
        <img src={boston_crab} className="home-image"></img>
      </Link>
      <ul>
        {" "}
        <li>
          <Link to="/wrestlersearch" onClick={() => closeDrop()}>
            <img src={wrestler} className="home-image"></img>
            <div className="text">Wrestlers</div>
          </Link>
        </li>
        <li>
          <Link to="/title" onClick={() => closeDrop()}>
            <img src={title} className="home-image"></img>
            <div className="text">Titles</div>
          </Link>
        </li>
        <li>
          <Link to="/company" onClick={() => closeDrop()}>
            <img src={company} className="home-image"></img>
            <div className="text">Companies</div>
          </Link>
        </li>
        <li>
          <Link to="/faction" onClick={() => closeDrop()}>
            <img src={faction} className="home-image"></img>
            <div className="text">Factions</div>
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => dropOpenClose()}>
              <img src={profile} className="dropdown-image"></img>
            </button>

            {checkLogIn}
          </div>
        </li>
      </ul>
    </nav>
  );
}
