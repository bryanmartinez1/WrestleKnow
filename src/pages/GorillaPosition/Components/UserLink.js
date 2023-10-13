import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import close_button from "../../../images/close icon.png";
import "./styles/userLink.css";

export default function UserLink(props) {
  const navigate = useNavigate();

  function toUser() {
    navigate(`/gp/user/${props.username}`);
  }

  function deleteFollow() {
    alert("Deleting follow");
  }

  return (
    <div className="userLink" onClick={() => toUser()}>
      <img className="pfpFollowImage" src={props.pfp} alt="PFP" />
      <div className="followUsername">{props.username}</div>
      <div className="closeButtonPlacement">
        <img
          className="followClose"
          src={close_button}
          alt="Close"
          onClick={() => deleteFollow()}
        />
      </div>
    </div>
  );
}
