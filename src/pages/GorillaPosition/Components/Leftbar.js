import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { Link, useNavigate } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./images/profile_icon.png";

export default function Leftbar(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userFirstName, setFirtName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPFP, setUserPFP] = useState(pfp);
  const [userBio, setUserBio] = useState("");

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    if (!currentUser) {
      toHome();
    }
    console.log(JSON.stringify(currentUser));
    if (currentUser !== null) {
      userInfo();
    }
    return currentUser;
  };

  async function userInfo() {
    const gpUserQuery = new Parse.Query("GP_Profile");
    let currentUserName = currentUser.get("username");
    gpUserQuery.equalTo("username", currentUserName);
    try {
      let gpUserResults = await gpUserQuery.find();
      setFirtName(gpUserResults[0].get("first_name"));
      setLastName(gpUserResults[0].get("last_name"));
      setUserName(gpUserResults[0].get("username"));
      setUserBio(gpUserResults[0].get("bio"));
      setUserPFP(
        JSON.stringify(gpUserResults[0].get("pfp"))
          .split('url":"')
          .pop()
          .slice(0, -2)
      );
      //setUserPFP();
    } catch (error) {
      console.log("Location: LeftBar User Info," + JSON.stringify(error));
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, [currentUser]);

  const toHome = () => {
    navigate("/");
    alert("You need to be logged in to access Gorilla Position");
  };

  function toUser() {
    navigate(`/gp/user/${userName}`);
  }

  return (
    <div className="leftside">
      <img className="pfp" src={userPFP} onClick={() => toUser()} />
      <div className="names" onClick={() => toUser()}>
        {userFirstName} {userLastName}
      </div>
      <div className="names" onClick={() => toUser()}>
        {userName}
      </div>
      <Link className="linkLeftBar" to={`/user/${userName}`}>
        10 Promos
      </Link>
      <Link className="linkLeftBar" to="/gp/follow">
        <div className="followHolder">
          <> 10 FOLLOWERS</>
          <> 400 FOLLOWING</>
        </div>
      </Link>
      <div className="bio">{userBio}</div>
      <Link className="linkLeftBar" to="/gp">
        Feed
      </Link>
      <Link className="linkLeftBar" to="/gp/messages">
        View Messages
      </Link>
      <Link className="linkLeftBar" to="/gp/bookmarks">
        View Bookmarks
      </Link>
      <Link className="linkLeftBar" to="/gp/searchresults">
        Search
      </Link>
    </div>
  );
}
