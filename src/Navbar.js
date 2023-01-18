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

  // Condtional Rendering Depending if the User is signed in or nop
  let options;

  if (currentUser === null) {
    options = (
      <div className="dropdown-content">
        <a>
          <Link to="/login">Log In</Link>
        </a>
        <a>
          <Link to="/signup">Sign Up</Link>
        </a>
        <a>
          <Link to="/settings">Settings</Link>
        </a>
      </div>
    );
  } else {
    options = (
      <div className="dropdown-content">
        <a>
          <Link to="/gorillaposition/profile">Gorilla Position</Link>
        </a>
        <a>
          <Link to="/" onClick={() => logOut()}>
            Log Out
          </Link>
        </a>
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
            Wrestlers
          </Link>
        </li>
        <li>
          <Link to="/title">
            <img src={title} className="home-image"></img>
            Titles
          </Link>
        </li>
        <li>
          <Link to="/company">
            <img src={company} className="home-image"></img>
            Companies
          </Link>
        </li>
        <li>
          <Link to="/faction">
            <img src={faction} className="home-image"></img>
            Factions
          </Link>
        </li>
        <li>
          <div class="dropdown">
            <button class="dropbtn">
              <img src={profile} className="home-image" />
            </button>
            <div class="dropdown-content">{options}</div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              <img src={profile} className="home-image" />
            </button>
            <div class="dropdown-content">{options}</div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
