import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useParams } from "react-router-dom";
import Promo from "./Components/Promo";
import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";
import UserInfo from "./Components/UserInfo";
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
      let extraImage = undefined;
      if (object.get("image") !== undefined) {
        extraImage = JSON.stringify(object.get("image"))
          .split('url":"')
          .pop()
          .slice(0, -2);
      }
      let vidURL = undefined;
      if (object.get("vid") !== undefined) {
        vidURL = JSON.stringify(object.get("vid"))
          .split('url":"')
          .pop()
          .slice(0, -2);
      }

      return (
        <Promo
          pfp={userQueryImagesJSON[talker]}
          username={talker}
          uploadDate={uploadDate}
          promo={object.get("content")}
          currentUserPromo={promoByCurrentUser}
          promoId={object.id}
          currentUserName={currentUserName}
          allPromos={query}
          replyTo={object.get("Reply")}
          pfpQuery={userQueryImagesJSON}
          image={extraImage}
          vid={vidURL}
        />
      );
    });
  }
  return (
    <div className="divider">
      <Leftbar pfpQuery={userQueryImagesJSON} />
      <div className="middle">
        <Topbar name="Gorilla Position" />
        <div className="middleBottom">
          <UserInfo />
          {showFeed && <>{showResults()}</>}
          <div className="space" />
        </div>
      </div>
      <Rightbar />
    </div>
  );
}
