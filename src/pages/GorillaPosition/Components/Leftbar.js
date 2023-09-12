import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./images/profile_icon.png";

export default function Leftbar(props) {
  const navigate = useNavigate();
  function toUser() {
    navigate("/gp/user");
  }

  // Get Current User Function
  return (
    <div className="leftside">
      <img className="pfp" src={props.pfp} onClick={() => toUser()} />
      <div className="names" onClick={() => toUser()}>
        {props.firstName} {props.lastName}
      </div>
      <div className="names" onClick={() => toUser()}>
        {props.userName}
      </div>
      <Link className="linkLeftBar" to="/gp/user">
        10 Promos
      </Link>
      <Link className="linkLeftBar" to="/gp/follow">
        <div className="followHolder">
          <> 10 FOLLOWERS</>
          <> 400 FOLLOWING</>
        </div>
      </Link>
      <div className="bio">{props.bio}</div>
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
