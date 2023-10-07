import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dropdownitems.css";
import Parse from "parse/dist/parse.min.js";

export default function Dropdownitems(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  function navigateTo(link) {
    navigate(link);
  }

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    props.setUser(currentUser);
    return currentUser;
  };

  const logOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        console.log("Log Out: No user is logged in anymore!");
        const currentURL = window.location.href;
        if (currentURL.includes("/gp")) {
          navigate("/");
        }
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <>
      {props.isLink ? (
        <div
          className="dropdownItems"
          onClick={() => navigateTo(`/${props.link}`)}
        >
          {props.content}
        </div>
      ) : (
        <div className="dropdownItems" onClick={() => logOut()}>
          {props.content}
        </div>
      )}
    </>
  );
}
