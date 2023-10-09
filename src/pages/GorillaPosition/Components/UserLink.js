import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/userLink.css";

export default function UserLink(props) {
  const navigate = useNavigate();

  function toUser() {
    navigate(`/gp/user/${props.username}`);
  }

  return (
    <div className="userLink" onClick={() => toUser()}>
      <img className="pfpFollowImage" src={props.pfp} />
      <div className="followUsername">{props.username}</div>
    </div>
  );
}
