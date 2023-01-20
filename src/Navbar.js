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

  getCurrentUser();
  const logOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert("Success! No user is logged in anymore!");
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  function nightMode() {
    alert("bruh");
  }

  let checkLogIn;
  if (currentUser === null) {
    checkLogIn = (
      <div class="content-box">
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  } else {
    checkLogIn = (
      <div class="content-box">
        <Link to="/account">Account</Link>
        <Link to="/gorillaposition">Gorilla Position</Link>
        <Link to="/" onClick={() => logOut()}>
          Log Out
        </Link>
      </div>
    );
  }

  return (
    <nav className="nav">
      <Link to="/" className="site-name">
        WrestleKnow
        <img src={boston_crab} className="home-image"></img>
      </Link>
      <ul>
        {" "}
        <li>
          <Link to="/wrestler">
            <img src={wrestler} className="home-image"></img>
            <div className="text">Wrestlers</div>
          </Link>
        </li>
        <li>
          <Link to="/title">
            <img src={title} className="home-image"></img>
            <div className="text">Titles</div>
          </Link>
        </li>
        <li>
          <Link to="/company">
            <img src={company} className="home-image"></img>
            <div className="text">Companies</div>
          </Link>
        </li>
        <li>
          <Link to="/faction">
            <img src={faction} className="home-image"></img>
            <div className="text">Factions</div>
          </Link>
        </li>
        <li>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => nightMode()}>
              <img src={profile} className="dropdown-image"></img>
            </button>

            {checkLogIn}
          </div>
        </li>
      </ul>
    </nav>
  );
}
