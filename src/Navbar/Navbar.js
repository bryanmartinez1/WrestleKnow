import "./navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

// Images for navbar
import boston_crab from "./Images/boston_crab.png";
import wrestler from "./Images/mask_icon.png";
import title from "./Images/title_icon.png";
import company from "./Images/company_icon.png";
import faction from "./Images/faction_icon.png";
import brand from "./Images/brand_icon.png";
import ppv from "./Images/ppv_icon.png";
import profile from "./Images/profile_icon.png";

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
  let dropOpened = false;
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
    // let a = currentUser.id;
    // console.log("ObjectID: " + a);

    // If the Current User is an Admin
    // User can do to the Admin Page from the Dropdown
    let isAdmin;
    if (currentUser.get("admin") === true) {
      isAdmin = (
        <Link to="/admin" onClick={() => closeDrop()}>
          Admin
        </Link>
      );
    }

    checkLogIn = (
      <div class="content-box" id="drop">
        {isAdmin}
        <Link to="/account" onClick={() => closeDrop()}>
          Account
        </Link>
        <Link to="/gp" onClick={() => closeDrop()}>
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
        <img src={boston_crab} alt="Boston Crab" className="home-image" />
      </Link>
      <ul className="linksList">
        <li>
          <Link to="/wrestler" onClick={() => closeDrop()}>
            <img
              src={wrestler}
              alt="Wrestler Page Logo"
              className="home-image"
            />
            <div className="text">Wrestlers</div>
          </Link>
        </li>
        <li>
          <Link to="/title" onClick={() => closeDrop()}>
            <img src={title} alt="Title Page Logo" className="home-image" />
            <div className="text">Titles</div>
          </Link>
        </li>
        <li>
          <Link to="/company" onClick={() => closeDrop()}>
            <img
              src={company}
              alt="Company Page Logo"
              className="home-image"
            ></img>
            <div className="text">Companies</div>
          </Link>
        </li>
        <li>
          <Link to="/faction" onClick={() => closeDrop()}>
            <img src={faction} alt="Faction Page Logo" className="home-image" />
            <div className="text">Factions</div>
          </Link>
        </li>
        <li>
          <Link to="/brand" onClick={() => closeDrop()}>
            <img src={brand} alt="Brand Page Logo" className="home-image" />
            <div className="text">Brands</div>
          </Link>
        </li>
        <li>
          <Link to="/ppv" onClick={() => closeDrop()}>
            <img src={ppv} alt="PPV Page Logo" className="home-image" />
            <div className="text">PPVs</div>
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => dropOpenClose()}>
              <img
                src={profile}
                alt="Profile Dropdown"
                className="dropdown-image"
              ></img>
            </button>

            {checkLogIn}
          </div>
        </li>
      </ul>
    </nav>
  );
}
