import React from "react";
import "./styles/socialMedia.css";
import twitterImg from "../../../images/twitterLogo.png";
import instagramImg from "../../../images/instagramLogo.png";
import tiktokImg from "../../../images/tiktokLogo.png";
import youtubeImg from "../../../images/youtubeLogo.png";

export default function SocialMedia(props) {
  function redirectTo(website) {
    window.open(website, "_blank");
  }
  return (
    <div className="socialMediaHolder">
      <div className="soicalMediaTitle">{props.title}</div>
      <div className="socialMediaBody">
        {props.twitter !== "" && (
          <div
            className="socialMediaInfo"
            onClick={() =>
              redirectTo("https://www.twitter.com/" + props.twitter)
            }
          >
            <img className="socialMediaLogo" src={twitterImg} />
            {props.twitter}
          </div>
        )}
        {props.instagram !== "" && (
          <div
            className="socialMediaInfo"
            onClick={() =>
              redirectTo("https://www.instagram.com/" + props.instagram)
            }
          >
            <img className="socialMediaLogo" src={instagramImg} />
            {props.instagram}
          </div>
        )}
        {props.tiktok !== "" && (
          <div
            className="socialMediaInfo"
            onClick={() =>
              redirectTo("https://www.tiktok.com/@" + props.tiktok)
            }
          >
            <img className="socialMediaLogo" src={tiktokImg} />
            {props.tiktok}
          </div>
        )}
        {props.youtuber !== "" && (
          <div
            className="socialMediaInfo"
            onClick={() =>
              redirectTo("https://www.youtube.com/@" + props.youtuber)
            }
          >
            <img className="socialMediaLogo" src={youtubeImg} />
            {props.youtuber}
          </div>
        )}
      </div>
    </div>
  );
}
