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
