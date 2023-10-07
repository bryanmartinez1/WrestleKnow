import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useParams } from "react-router-dom";
import Promo from "./Components/Promo";
import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";
import pfpImage from "./Components/images/profile_icon.png";

export default function User() {
  const { username } = useParams(); // Accessing the route parameter

  const [showFeed, setShowFeed] = useState(false);
  const [query, setQuery] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userQueryImagesJSON, setUserQueryImagesJSON] = useState({});

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);

    return currentUser;
  };
  useEffect(() => {
    feedQuery();
    if (!showFeed) {
      getCurrentUser();
      userQueryImages();
    }
    console.log("HELLO" + username);
  }, [showFeed, username]);
  async function userQueryImages() {
    const userQuery = new Parse.Query("GP_Profile");
    try {
      let userResults = await userQuery.find();
      const userNameToPFP = {};
      for (let usersPFP of userResults) {
        const username = usersPFP.get("username");
        const pfpURL = JSON.stringify(usersPFP.get("pfp"))
          .split('url":"')
          .pop()
          .slice(0, -2);
        userNameToPFP[username] = pfpURL;
      }
      setUserQueryImagesJSON(userNameToPFP);
    } catch (error) {
      console.log("USER QUERY" + JSON.stringify(error));
    }
  }

  async function feedQuery() {
    console.log("HOW MANY TIMES");
    const promoQuery = new Parse.Query("Promos");
    promoQuery.equalTo("talker", username);
    promoQuery.descending("createdAt");
    try {
      let promoResults = await promoQuery.find();
      setQuery(promoResults);
      setShowFeed(true);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  function showResults() {
    return query.map((object) => {
      let uploadDate = object
        .get("createdAt")
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
        .toString();
      let talker = object.get("talker");
      let currentUserName = currentUser.get("username");
      let promoByCurrentUser = object.get("talker") === currentUserName;

      return (
        <Promo
          pfp={userQueryImagesJSON[talker]}
          username={talker}
          uploadDate={uploadDate}
          promo={object.get("content")}
          currentUserPromo={promoByCurrentUser}
          promoId={object.id}
          currentUserName={currentUserName}
        />
      );
    });
  }
  return (
    <div className="divider">
      <Leftbar
        pfp={pfpImage}
        firstName="Other"
        lastName="User"
        userName="Other User"
        bio="Random stuff bio idk man"
      />
      <div className="middle">
        <Topbar name="Gorilla Position" />
        <div className="middleBottom">
          {showFeed && <>{showResults()}</>}
          <div className="space" />
        </div>
      </div>
      <Rightbar />
    </div>
  );
}
