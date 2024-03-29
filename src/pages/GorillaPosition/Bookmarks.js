import React from "react";
import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";
import pfpImage from "./Components/images/profile_icon.png";

export default function Bookmarks() {
  // add get current user function
  return (
    <div className="divider">
      <Leftbar
        pfp={pfpImage}
        firstName="Bryan"
        lastName="Bryan"
        userName="Other User"
        bio="Random stuff bio idk man"
      />
      <div className="middle">
        <Topbar name="Bookmarks" />
        <div className="middleBottom">
          <div className="space"></div>
        </div>
      </div>
      <Rightbar />
    </div>
  );
}
