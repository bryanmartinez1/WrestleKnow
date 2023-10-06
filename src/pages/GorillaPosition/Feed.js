import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

//  Images
import Leftbar from "./Components/Leftbar";
import Promo from "./Components/Promo";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import pfpImage from "./Components/images/profile_icon.png";

//initializeParse(Back4App_SubDomain, App_ID, JS_Key);

export default function Feed() {
  let pfp = pfpImage;

  const [showFeed, setShowFeed] = useState(false);
  const [query, setQuery] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userQueryImagesJSON, setUserQueryImagesJSON] = useState({});

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    setCurrentUser(currentUser);
    return currentUser;
  };

  useEffect(() => {
    if (!showFeed) {
      feedQuery();
      getCurrentUser();
      userQueryImages();
    }
  }, [showFeed]);

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
    promoQuery.descending("createdAt");
    try {
      let promoResults = await promoQuery.find();
      setQuery(promoResults);
      setShowFeed(true);
    } catch (error) {
      console.log(JSON.stringify(error));
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

      let promoByCurrentUser =
        object.get("talker") === currentUser.get("username");

      return (
        <Promo
          pfp={userQueryImagesJSON[object.get("talker")]}
          username={object.get("talker")}
          uploadDate={uploadDate}
          promo={object.get("content")}
          currentUserPromo={promoByCurrentUser}
          promoId={object.id}
        />
      );
    });
  }

  return (
    <div className="divider">
      <Leftbar />
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
