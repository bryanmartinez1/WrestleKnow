import React, { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Parse from "parse/dist/parse.min.js";
import "./styles/promos.css";

import Modal, { ModalFooter } from "@atlaskit/modal-dialog";
import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import Button from "@atlaskit/button";
import DropdownMenu, { DropdownItemGroup } from "@atlaskit/dropdown-menu";

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
import download_button from "./images/download.png";

export default function Promo(props) {
  const navigate = useNavigate();

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

  const [isReplyModalOpen, openCloseReplyModal] = useState();
  const openReplyModal = useCallback(() => openCloseReplyModal(true), []);
  const closeReplyModal = useCallback(() => openCloseReplyModal(false), []);

  const [isExpandModalOpen, openCloseExpandModal] = useState();
  const openExpandModal = useCallback(() => openCloseExpandModal(true), []);
  const closeExpandModal = useCallback(() => openCloseExpandModal(false), []);

  const [isCommentModalOpen, openCloseCommentModal] = useState();
  const openCommentModal = useCallback(() => openCloseCommentModal(true), []);
  const closeCommentModal = useCallback(() => openCloseCommentModal(false), []);

  const [cheerReaction, setCheerReaction] = useState(false);
  const [cheerReactionID, setCheerReactionID] = useState(null);
  const [booReaction, setBooReaction] = useState(false);
  const [booReactionID, setBooReactionID] = useState(null);

  const promoHeightRef = useRef(null);
  const [promoHeight, setPromoHeight] = useState(0);
  const measurePromoHeight = () => {
    if (promoHeightRef.current) {
      const height = promoHeightRef.current.offsetHeight;
      setPromoHeight(height);
    }
  };

  useEffect(() => {
    measurePromoHeight();
    reactionsQuery();
    bookmarkQuery();
  }, [cheerReaction, booReaction]);

  function toUser() {
    navigate(`/gp/user/${props.username}`);
  }

  async function Cheer() {
    // Destroys
    if (cheerReaction) {
      const cheerObject = new Parse.Object("Reactions");
      cheerObject.set("Promo", props.promoId);
      cheerObject.set("Reacter", props.currentUserName);
      try {
        await cheerObject.destroy();
        // Change the hooks here
        console.log(cheerReactionID);
        setCheerReaction(false);
        return true;
      } catch (error) {
        console.error(JSON.stringify(error));
        return false;
      }
    }

    // Edits
    if (booReaction) {
      const bootoCheerObject = new Parse.Object("Reactions");
      bootoCheerObject.set("objectId", cheerReactionID);
      bootoCheerObject.set("Reaction", "Cheer");
      bootoCheerObject.set("Reacter", props.currentUserName);
      try {
        await bootoCheerObject.save();
        setCheerReaction(true);
        setBooReaction(false);
        return true;
      } catch (error) {
        console.error(JSON.stringify(error));
        return false;
      }
    }

    //Creates
    const newReaction = new Parse.Object("Reactions");
    newReaction.set("Reacter", props.currentUserName);
    newReaction.set("Reaction", "Cheer");
    newReaction.set("Promo", props.promoId);
    try {
      await newReaction.save();
      setCheerReaction(true);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  }
  async function Boo() {
    // Destroys
    if (booReaction) {
      const booObject = new Parse.Object("Reactions");
      booObject.set("Promo", props.promoId);
      booObject.set("Reacter", props.currentUserName);
      try {
        await booObject.destroy();
        // Change the hooks here
        setCheerReaction(false);
        return true;
      } catch (error) {
        console.error(JSON.stringify(error));
        return false;
      }
    }

    // Edits
    if (cheerReaction) {
      const cheerToBooObject = new Parse.Object("Reactions");
      cheerToBooObject.set("objectId", cheerReactionID);
      cheerToBooObject.set("Reaction", "Cheer");
      cheerToBooObject.set("Reacter", props.currentUserName);
      try {
        await cheerToBooObject.save();
        setCheerReaction(false);
        setBooReaction(true);
        return true;
      } catch (error) {
        console.error(JSON.stringify(error));
        return false;
      }
    }

    //Creates
    const newReaction = new Parse.Object("Reactions");
    newReaction.set("Reacter", props.currentUserName);
    newReaction.set("Reaction", "Boo");
    newReaction.set("Promo", props.promoId);
    try {
      await newReaction.save();
      setBooReaction(true);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
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
  const downloadPromo = () => {
    const table = document.getElementById("promoModal");

    html2canvas(table).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "promo.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const [replyContent, setReplyContent] = useState("");
  async function replyPromo() {
    const newReply = new Parse.Object("Promos");
    newReply.set("content", replyContent);
    newReply.set("talker", props.currentUserName);
    newReply.set("Reply", props.promoId);
    try {
      const promo = await newReply.save();
      closeReplyModal();
    } catch (error) {
      alert("Error while creating Reply" + error);
    }
    window.location.reload(true);
  }

  const reactionsQuery = async () => {
    const reactionsQuery = new Parse.Query("Reactions");
    reactionsQuery.equalTo("Promo", props.promoId);
    reactionsQuery.equalTo("Reacter", props.currentUserName);
    try {
      let reactionResult = await reactionsQuery.first();
      if (reactionResult === null) {
        return true;
      }
      let reaction = reactionResult.get("Reaction");
      if (reaction == "Cheer") {
        setCheerReaction(true);
        setCheerReactionID(reactionResult.id);
      } else {
        setBooReaction(true);
        setBooReactionID(reactionResult.id);
      }
      return true;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const [bookmark, setBookmark] = useState(false);
  const bookmarkQuery = async () => {
    const bookmarkQuery = new Parse.Query("Bookmarks");
    bookmarkQuery.equalTo("promo", props.promoId);
    bookmarkQuery.equalTo("username", props.currentUserName);
    try {
      let bookmarkResult = await bookmarkQuery.first();
      if (bookmarkResult !== null && bookmarkResult !== undefined) {
        setBookmark(true);
        return true;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

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

  function showResults() {
    let commentsQuery = props.allPromos;
    let pfpQuery = props.pfpQuery;

    return commentsQuery.map((object) => {
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
      let currentUserName = props.currentUserName;
      let promoByCurrentUser = talker === currentUserName;
      if (props.promoId === object.get("Reply")) {
        return (
          <Promo
            pfp={pfpQuery[talker]}
            username={talker}
            uploadDate={uploadDate}
            promo={object.get("content")}
            currentUserPromo={promoByCurrentUser}
            promoId={object.id}
            currentUserName={currentUserName}
            allPromos={commentsQuery}
            replyTo={object.get("Reply")}
            pfpQuery={pfpQuery}
          />
        );
      }
      return null;
    });
  }

  return (
    <div className="whole">
      <img
        className="promoImg"
        src={props.pfp}
        onClick={() => toUser()}
        alt="PFP"
      />
      <div className="content">
        <div className="topBar">
          <div className="userName" onClick={() => toUser()}>
            {props.username}
          </div>
          <div className="rowAlign">
            <div className="datePosted">{props.uploadDate}</div>
            <div className="spaceBetween" />
            <DropdownMenu
              placement="bottom-end"
              trigger={({ triggerRef, ...props }) => (
                <Button
                  {...props}
                  appearance="subtle"
                  spacing="none"
                  ref={triggerRef}
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
            >
              <>
                {props.currentUserPromo ? (
                  <DropdownItemGroup>
                    <div className="actionMenuButton" onClick={openExpandModal}>
                      Expand
                    </div>
                    <div className="actionMenuButton" onClick={openEditModal}>
                      Edit
                    </div>
                    <div
                      className="actionMenuButton"
                      onClick={() => deletePromo()}
                    >
                      Delete
                    </div>
                  </DropdownItemGroup>
                ) : (
                  <DropdownItemGroup>
                    <div className="actionMenuButton" onClick={openExpandModal}>
                      Expand
                    </div>
                    <div
                      className="actionMenuButton"
                      onClick={() => blockUser()}
                    >
                      Block
                    </div>
                    <div className="actionMenuButton" onClick={openReportModal}>
                      Report
                    </div>
                  </DropdownItemGroup>
                )}
              </>
            </DropdownMenu>
          </div>
        </div>
        <div className="promo" ref={promoHeightRef}>
          {props.promo}
        </div>
        {promoHeight >= 150 && (
          <div className="expandPromoButton" onClick={openExpandModal}>
            Click to Expand Promo
          </div>
        )}
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
                src={cheerReaction ? cheered : cheer}
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
                src={booReaction ? booed : boo}
                alt="boos"
              ></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">Reply</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={openReplyModal}>
              <img className="imgButton" src={reply} alt="reply"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">View Comments</div>}
            hideTooltipOnMouseDown
          >
            <button onClick={openCommentModal}>
              <img className="imgButton" src={comment} alt="comments"></img>
            </button>
          </Tooltip>
          <Tooltip
            component={TooltipPrimitive}
            content={<div className="tooltipPromoReactions">Bookmark</div>}
            hideTooltipOnMouseDown
          >
            <button>
              <img
                id="saves"
                className="bookmarkButton"
                src={bookmark ? saved : notSaved}
                alt="saves"
              ></img>
            </button>
          </Tooltip>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal onClose={closeEditModal} width={"75%"} height={"75%"}>
          <div className="createPromoModalHeader">
            <h1>Edit Promo</h1>
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
        <Modal onClose={closeReportModal} width={"75%"} height={"75%"}>
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
      {isExpandModalOpen && (
        <Modal onClose={closeExpandModal} width={"75%"} height={"100%"}>
          <div className="expandPromoModal" id="promoModal">
            <div className="createPromoModalHeader">
              <h1>{props.username}</h1>
              <img
                className="closeModalButton"
                src={close_button}
                onClick={closeExpandModal}
              />
            </div>
            <div className="expandPromoBody">{props.promo}</div>
            <div className="expandModalFooter">
              {props.uploadDate}
              <img
                className="downloadButton"
                src={download_button}
                alt="Download Button"
                onClick={downloadPromo}
              />
            </div>
          </div>
        </Modal>
      )}
      {isReplyModalOpen && (
        <Modal onClose={closeReplyModal} width={"75%"} height={"75%"}>
          <div className="createPromoModalHeader">
            <h1>Create Reply</h1>
            <img
              className="closeModalButton"
              src={close_button}
              onClick={closeReplyModal}
            />
          </div>
          <textarea
            placeholder="enter promo here"
            className="createPromoTextBox"
            type="text"
            onChange={(event) => setReplyContent(event.target.value)}
          />
          <ModalFooter>
            <img
              className="addModalButton"
              src={add_button}
              alt="Add Promo"
              onClick={() => replyPromo()}
            />
          </ModalFooter>
        </Modal>
      )}
      {isCommentModalOpen && (
        <Modal onClose={closeCommentModal} width={"75%"}>
          <div className="expandPromoModal" id="promoModal">
            <div className="createPromoModalHeader">
              <h1>All Replies</h1>
              <img
                className="closeModalButton"
                src={close_button}
                onClick={closeCommentModal}
              />
            </div>
            <div className="expandPromoBody">
              <Promo
                pfp={props.pfp}
                username={props.username}
                uploadDate={props.uploadDate}
                promo={props.promo}
                currentUserPromo={props.currentUserPromo}
                promoId={props.promoId}
                currentUserName={props.currentUserName}
              />
              {showResults()}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
