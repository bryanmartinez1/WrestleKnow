import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/promos.css";
import pfp from "./images/profile_icon.png";
import cheer from "./images/cheers.png";
import boo from "./images/boo.png";
import cheered from "./images/cheered.png";
import booed from "./images/booed.png";
import comment from "./images/comment.png";
import notSaved from "./images/bookmark.png";
import saved from "./images/bookmarked.png";
import reply from "./images/reply.png";

export default function Promo(props) {
  const navigate = useNavigate();
  // get Current User Function
  // Query into Bookmarks
  // Query with Current Promo Id and Current User ID if query is empty then it is not bookmarked so will not have different font

  function toUser() {
    navigate("/gp/user");
  }

  function Cheer() {
    alert("Cheer");
  }
  function Boo() {
    alert("Boo");
  }
  function Reply() {
    alert("Create Reply");
  }
  function Comments() {
    alert("View Comments");
  }
  function Bookmark() {
    alert("Bookmarking this promo");
  }

  // UserNameUserNameUserName
  // SEPTEMBER 31, 2023 12:59 PM
  /* This is just to show the max amount for characters allowed. User can
  have a post with up to a max of 256 characters. This post has 256
  characters. The false date posted is September 31, 2023 at 12:59 PM.
  206 210 214 218 222 226 230 234 238 242 246 250 254. */
  return (
    <div className="whole">
      <img className="promoImg" src={props.pfp} onClick={() => toUser()}></img>
      <div className="content">
        <div className="topBar">
          <div className="userName" onClick={() => toUser()}>
            {" "}
            {props.username}
          </div>
          <div className="datePosted">{props.uploadDate}</div>
        </div>
        <div className="promo">{props.promo}</div>
        <div className="bottomBar">
          <button onClick={() => Cheer()}>
            <img
              id="cheers"
              className="imgButton"
              src={props.cheers ? cheered : cheer}
            ></img>
          </button>
          <button onClick={() => Boo()}>
            <img
              id="boos"
              className="imgButton"
              src={props.boos ? booed : boo}
            ></img>
          </button>
          <button onClick={() => Reply()}>
            <img className="imgButton" src={reply}></img>
          </button>
          <button onClick={() => Comments()}>
            <img className="imgButton" src={comment}></img>
          </button>
          <button onClick={() => Bookmark()}>
            <img
              id="saves"
              className="imgButton"
              src={props.bookmarked ? saved : notSaved}
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}
