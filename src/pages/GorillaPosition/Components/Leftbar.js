import React, { useEffect, useState, useCallback } from "react";
import Parse from "parse/dist/parse.min.js";
import { Link, useNavigate } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./images/profile_icon.png";
import Modal from "@atlaskit/modal-dialog";
import UserLink from "./UserLink";

export default function Leftbar(props) {
  const navigate = useNavigate();
  const [followResult, setFollowResult] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [userFirstName, setFirtName] = useState("");
  const [userLastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userPFP, setUserPFP] = useState(pfp);
  const [userBio, setUserBio] = useState("");

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    if (!currentUser) {
      toHome();
    }
    if (currentUser !== null) {
      userInfo();
    }
    return currentUser;
  };

  const [isFollowModalOpen, openCloseFollowModal] = useState();
  const openFollowModal = useCallback(() => openCloseFollowModal(true), []);
  const closeFollowModal = useCallback(() => openCloseFollowModal(false), []);

  const followCount = async () => {
    const followQuery = new Parse.Query("Follow");
    try {
      let followResults = await followQuery.find();
      setFollowResult(followResults);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  async function userInfo() {
    const gpUserQuery = new Parse.Query("GP_Profile");
    let currentUserName = currentUser.get("username");
    gpUserQuery.equalTo("username", currentUserName);
    try {
      let gpUserResults = await gpUserQuery.find();
      setFirtName(gpUserResults[0].get("first_name"));
      setLastName(gpUserResults[0].get("last_name"));
      setUserName(gpUserResults[0].get("username"));
      setUserBio(gpUserResults[0].get("bio"));
      setUserPFP(
        JSON.stringify(gpUserResults[0].get("pfp"))
          .split('url":"')
          .pop()
          .slice(0, -2)
      );
      //setUserPFP();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  useEffect(() => {
    getCurrentUser();
    followCount();
  }, [currentUser]);

  const toHome = () => {
    navigate("/");
    alert("You need to be logged in to access Gorilla Position");
  };

  function toUser() {
    navigate(`/gp/user/${userName}`);
  }

  function showFollowing() {}

  function showFollowers() {}

  return (
    <div className="leftside">
      <img className="pfp" src={userPFP} onClick={() => toUser()} />
      <div className="names" onClick={() => toUser()}>
        {userFirstName} {userLastName}
      </div>
      <div className="names" onClick={() => toUser()}>
        {userName}
      </div>
      <Link className="linkLeftBar" to={`/gp/user/${userName}`}>
        10 Promos
      </Link>
      <div className="followHolder" onClick={openFollowModal}>
        <div className="followNumber">
          10 <div className="followText">Followers</div>
        </div>
        <div className="followNumber">
          400 <div className="followText">Following</div>
        </div>
      </div>
      <div className="bio">{userBio}</div>
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
      {isFollowModalOpen && (
        <Modal onClose={closeFollowModal} width={"100%"} height={"90%"}>
          <div className="followModal">
            <div className="followDivs">
              Followers
              <div className="followContent">
                <UserLink username="am" pfp={pfp} />
              </div>
            </div>
            <div className="followDivider" />
            <div className="followDivs">
              Follwing
              <div className="followContent">
                <UserLink username="am" pfp={pfp} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
