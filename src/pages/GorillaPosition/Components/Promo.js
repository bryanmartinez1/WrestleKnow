import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/promos.css";
import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";

import cheer from "./images/cheers.png";
import boo from "./images/boo.png";
import cheered from "./images/cheered.png";
import booed from "./images/booed.png";
import comment from "./images/comment.png";
import notSaved from "./images/bookmark.png";
import saved from "./images/bookmarked.png";
import reply from "./images/reply.png";
import moreOptions from "../../../images/3dots.png";

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

  function openMoreFeauturesActionMenu() {
    alert("Action Menu for more features opens");
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
          <div className="rowAlign">
            <div className="datePosted">{props.uploadDate}</div>
            <div className="spaceBetween" />
            <img
              src={moreOptions}
              alt="Open Action Menu"
              className="imgButton"
              onClick={() => openMoreFeauturesActionMenu()}
            />
          </div>
        </div>
        <div className="promo">{props.promo}</div>
        <div className="bottomBar">
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipContent">Cheer</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Cheer()}>
              <img
                id="cheers"
                className="imgButton"
                src={props.cheers ? cheered : cheer}
                alt="cheers"
              ></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipContent">Boo</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Boo()}>
              <img
                id="boos"
                className="imgButton"
                src={props.useState ? booed : boo}
                alt="boos"
              ></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipContent">Reply</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Reply()}>
              <img className="imgButton" src={reply} alt="reply"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipContent">View Comments</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Comments()}>
              <img className="imgButton" src={comment} alt="comments"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipContent">Bookmark</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Bookmark()}>
              <img
                id="saves"
                className="bookmarkButton"
                src={props.bookmarked ? saved : notSaved}
                alt="saves"
              ></img>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
