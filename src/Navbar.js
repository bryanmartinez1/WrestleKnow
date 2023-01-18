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
  let button;
  if (currentUser === null) {
    button = (
      <div>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </div>
    );
  } else {
    button = <button onClick={logOut}>Log Out</button>;
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
          <img src={profile} className="home-image"></img>
        </li>
        {button}
      </ul>
    </nav>
  );
}
