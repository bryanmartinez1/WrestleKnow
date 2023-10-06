import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { initializeParse, useParseQuery } from "@parse/react";
import { JS_Key, App_ID, Back4App_SubDomain } from "../../KEYS";

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

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    console.log(JSON.stringify(currentUser.get("username")));

    return currentUser;
  };

  useEffect(() => {
    if (!showFeed) {
      feedQuery();
      getCurrentUser();
    }
  }, [showFeed]);

  async function feedQuery() {
    const promoQuery = new Parse.Query("Promos");
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

      let promoByCurrentUser =
        object.get("talker") === currentUser.get("username");

      return (
        <Promo
          pfp={pfp}
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
