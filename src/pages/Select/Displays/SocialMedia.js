import React from "react";
import "./styles/socialMedia.css";
import twitterImg from "../../../images/twitterLogo.png";
import instagramImg from "../../../images/instagramLogo.png";
import tiktokImg from "../../../images/tiktokLogo.png";
import youtubeImg from "../../../images/youtubeLogo.png";
import threadsLogo from "../../../images/Threads.png";

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
            <img className="socialMediaLogo" src={twitterImg} alt="Twitter" />
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
            <img
              className="socialMediaLogo"
              src={instagramImg}
              alt="Instagram"
            />
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
            <img className="socialMediaLogo" src={tiktokImg} alt="Tiktok" />
            {props.tiktok}
          </div>
        )}
        {props.threads !== "" && (
          <div
            className="socialMediaInfo"
            onClick={() =>
              redirectTo("https://www.threads.net/@" + props.threads)
            }
          >
            <img className="socialMediaLogo" src={threadsLogo} alt="Tiktok" />
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
            <img className="socialMediaLogo" src={youtubeImg} alt="Youtube" />
            {props.youtuber}
          </div>
        )}
      </div>
    </div>
  );
}
