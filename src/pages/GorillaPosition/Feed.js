import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";

//  Images
import Leftbar from "./Components/Leftbar";
import Promo from "./Components/Promo";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";

//initializeParse(Back4App_SubDomain, App_ID, JS_Key);

export default function Feed() {
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

      let talker = object.get("talker");
      let currentUserName = currentUser.get("username");
      let promoByCurrentUser = talker === currentUserName;
      let extraImage = undefined;
      if (object.get("image") !== undefined) {
        extraImage = JSON.stringify(object.get("image"))
          .split('url":"')
          .pop()
          .slice(0, -2);
        console.log(extraImage);
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
          {showFeed && <>{showResults()}</>}
          <div className="space" />
        </div>
      </div>
      <Rightbar />
    </div>
  );
}
