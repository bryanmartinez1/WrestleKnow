import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/promos.css";
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

  return (
    <div className="whole">
      <img
        className="promoImg"
        src={props.pfp}
        onClick={() => toUser()}
        alt="PFP"
      ></img>
      <div className="content">
        <div className="topBar">
          <div className="userName" onClick={() => toUser()}>
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
              alt="cheers"
            ></img>
          </button>
          <button onClick={() => Boo()}>
            <img
              id="boos"
              className="imgButton"
              src={props.useState ? booed : boo}
              alt="boos"
            ></img>
          </button>
          <button onClick={() => Reply()}>
            <img className="imgButton" src={reply} alt="reply"></img>
          </button>
          <button onClick={() => Comments()}>
            <img className="imgButton" src={comment} alt="comments"></img>
          </button>
          <button onClick={() => Bookmark()}>
            <img
              id="saves"
              className="imgButton"
              src={props.bookmarked ? saved : notSaved}
              alt="saves"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}
