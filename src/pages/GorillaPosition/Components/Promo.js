import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./styles/promos.css";

import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import Button from "@atlaskit/button";
import Popup from "@atlaskit/popup";
import { DropdownItemGroup } from "@atlaskit/dropdown-menu";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [actionMenuOpen, setActionMenu] = useState(false);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };
  function toUser() {
    navigate(`/gp/user/${props.username}`);
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
  function editPromo() {
    alert("Edit Promo");
  }
  async function deletePromo() {
    const promo = new Parse.Object("Promos");
    promo.set("objectId", props.promoId);
    try {
      await promo.destroy();
      window.location.reload(false);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error ${error.message}`);
      return false;
    }
  }
  function downloadPromo() {
    alert("Download Promo");
  }
  function analyzePromo() {
    alert("Delete Promo");
  }
  function blockUser() {
    alert("Block User");
  }
  function reportPromo() {
    alert("Report Promo");
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
            <Popup
              isOpen={actionMenuOpen}
              onClose={() => setActionMenu(false)}
              placement="bottom-end"
              content={() => (
                <>
                  {props.currentUserPromo ? (
                    <DropdownItemGroup>
                      <div
                        className="actionMenuButton"
                        onClick={() => editPromo()}
                      >
                        Edit
                      </div>
                      <div
                        className="actionMenuButton"
                        onClick={() => deletePromo()}
                      >
                        Delete
                      </div>
                      <div
                        className="actionMenuButton"
                        onClick={() => analyzePromo()}
                      >
                        Analytics
                      </div>
                      <div
                        className="actionMenuButton"
                        onClick={() => downloadPromo()}
                      >
                        Download
                      </div>
                    </DropdownItemGroup>
                  ) : (
                    <DropdownItemGroup>
                      <div
                        className="actionMenuButton"
                        onClick={() => blockUser()}
                      >
                        Block
                      </div>
                      <div
                        className="actionMenuButton"
                        onClick={() => reportPromo()}
                      >
                        Report
                      </div>
                      <div
                        className="actionMenuButton"
                        onClick={() => downloadPromo()}
                      >
                        Download
                      </div>
                    </DropdownItemGroup>
                  )}
                </>
              )}
              trigger={(triggerProps) => (
                <Button
                  {...triggerProps}
                  appearance="subtle"
                  spacing="none"
                  onClick={() => setActionMenu(!actionMenuOpen)}
                >
                  <div className="margin">
                    <img
                      className="imgButton"
                      src={moreOptions}
                      alt="Open Action Menu"
                    />
                  </div>
                </Button>
              )}
            />
          </div>
        </div>
        <div className="promo">{props.promo}</div>
        <div className="bottomBar">
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">Cheer</div>}
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
            content={<div className="tooltipPromoReactions">Boo</div>}
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
            content={<div className="tooltipPromoReactions">Reply</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Reply()}>
              <img className="imgButton" src={reply} alt="reply"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">View Comments</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={() => Comments()}>
              <img className="imgButton" src={comment} alt="comments"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">Bookmark</div>}
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
