import React from "react";
import Leftbar from "./Components/Leftbar";
import Promo from "./Components/Promo";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";
import pfpImage from "./Components/images/profile_icon.png";

export default function Feed() {
  // Promo Hooks
  let pfp = pfpImage;
  let userName = "UserNameUserNameUserName";
  let uploadDate = "SEPTEMBER 31, 2023 12:59 PM";
  let promo =
    "This is just to show the max amount for characters allowed. User can have a post with up to a max of 256 characters. This post has 256 characters. The false date posted is September 31, 2023 at 12:59 PM. 206 210 214 218 222 226 230 234 238 242 246 250 254.";
  return (
    <div className="divider">
      <Leftbar
        pfp={pfpImage}
        firstName="Bryan"
        lastName="Bryan"
        userName="am"
        bio="Random stuff bio idk man"
      />
      <div className="middle">
        <Topbar name="Gorilla Position" />
        <div className="middleBottom">
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={true}
            boos={true}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            cheers={true}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={false}
          />
          <Promo
            pfp={pfp}
            username={userName}
            uploadDate={uploadDate}
            promo={promo}
            bookmarked={true}
          />
          <div className="space"></div>
        </div>
      </div>
      <Rightbar />
    </div>
  );
}
