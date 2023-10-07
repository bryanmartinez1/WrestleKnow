import React, { useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./styles/promos.css";

import Modal, { ModalFooter } from "@atlaskit/modal-dialog";
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
import close_button from "./images/close.png";
import add_button from "./images/add.png";

export default function Promo(props) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [actionMenuOpen, setActionMenu] = useState(false);
  const [isEditModalOpen, openCloseEditModal] = useState(false);
  const openEditModal = useCallback(() => openCloseEditModal(true), []);
  const closeEditModal = useCallback(() => {
    openCloseEditModal(false);
    setContent(props.promo);
  }, []);
  const [content, setContent] = useState(props.promo);
  const [reportReason, setReportReason] = useState("");

  const [isReportModalOpen, openCloseReportModal] = useState();
  const openReportModal = useCallback(() => openCloseReportModal(true), []);
  const closeReportModal = useCallback(() => openCloseReportModal(false), []);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
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
  async function editPromo() {
    let editPromo = new Parse.Object("Promos");
    editPromo.set("objectId", props.promoId);
    editPromo.set("content", content);
    try {
      await editPromo.save();
      window.location.reload(false);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error ${error.message}`);
      return false;
    }
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
    alert("Anaylze Promo");
  }
  function blockUser() {
    alert("Block User");
  }
  async function reportPromo() {
    if (reportReason.length < 20) {
      alert(
        "If you wish to report, please give a more indepth reason as to why you are reporting (20 characters min"
      );
      return false;
    }
    const reportObject = new Parse.Object("Reports");
    reportObject.set("userReporting", props.currentUserName);
    reportObject.set("reportedUser", props.username);
    reportObject.set("promoReported", props.promo);
    reportObject.set("reasonReported", reportReason);
    try {
      await reportObject.save();
      // Success
      console.log("Report was successfully submitted");
      closeReportModal();
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
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
                      <div className="actionMenuButton" onClick={openEditModal}>
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
                        onClick={openReportModal}
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
      {isEditModalOpen && (
        <Modal onClose={closeEditModal} width={"50%"} height={"75%"}>
          <div className="createPromoModalHeader">
            <h1>Cut a Promo</h1>
            <img
              className="closeModalButton"
              src={close_button}
              onClick={closeEditModal}
            />
          </div>
          <div className="createPromoModalBody">
            <textarea
              value={content}
              className="createPromoTextBox"
              type="text"
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <ModalFooter>
            <img
              className="addModalButton"
              src={add_button}
              alt="Add Promo"
              onClick={() => editPromo()}
            />
          </ModalFooter>
        </Modal>
      )}
      {isReportModalOpen && (
        <Modal onClose={closeReportModal} width={"50%"} height={"75%"}>
          <div className="createPromoModalHeader">
            <h1>Reporting {props.username}</h1>
            <img
              className="closeModalButton"
              src={close_button}
              onClick={closeReportModal}
            />
          </div>
          <div className="createPromoModalBody">
            <textarea
              placeholder="Please place report reason here (20 character min)"
              className="createPromoTextBox"
              type="text"
              onChange={(event) => setReportReason(event.target.value)}
            />
          </div>
          <ModalFooter>
            <img
              className="addModalButton"
              src={add_button}
              alt="Add Promo"
              onClick={() => reportPromo()}
            />
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
