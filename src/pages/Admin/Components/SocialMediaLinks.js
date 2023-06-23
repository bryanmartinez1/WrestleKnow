import React from "react";
import "./styles/socialMediaLinks.css";
import twitterLogo from "../../../images/twitterLogo.png";
import instagramLogo from "../../../images/instagramLogo.png";
import youtubeLogo from "../../../images/youtubeLogo.png";
import tiktokLogo from "../../../images/tiktokLogo.png";
import googleSheetsLogo from "../../../images/googleSheetsLogo.png";

export default function SocialMediaLinks(props) {
  //  add functions to remove whole webpage
  //  Possibly Shortne it More Later
  //  Use Inputs Component Here
  //  Add Boolean to Inputs to see if an image who display next to header

  function redirectTo(website) {
    window.open(website, "_blank");
  }

  function settingCompanyPointer(value) {
    props.setCompanyPointer(value);
  }
  function settingTwitterLink(value) {
    props.setInstagramLink(value);
  }
  function settingInstagramAt(value) {
    props.setInstagramLink(value);
  }
  function settingTiktokLink(value) {
    props.setTiktokLink(value);
  }
  function settingYoutubeAt(value) {
    props.setYoutubeAt(value);
  }
  function settingYoutubeVid(value) {
    props.setYoutubeVid(value);
  }

  return (
    <div className="holderPage">
      <>
        <h1 className="header">
          Company Pointer
          <img
            className="logoImg"
            src={googleSheetsLogo}
            onClick={() =>
              redirectTo(
                "https://docs.google.com/spreadsheets/d/1SddwVXeAJcIRhbj5cSJ5P9s2ZYWljJZCVBeM2E1R_Io/edit?usp=sharing"
              )
            }
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingCompanyPointer(event.target.value)}
        />
      </>
      <>
        <h1 className="header">
          Twitter At
          <img
            className="logoImg"
            src={twitterLogo}
            onClick={() => redirectTo("https://www.twitter.com/")}
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingTwitterLink(event.target.value)}
        />
      </>
      <>
        <h1 className="header">
          Instagram At
          <img
            className="logoImg"
            src={instagramLogo}
            onClick={() => redirectTo("https://www.instagram.com/")}
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingInstagramAt(event.target.value)}
        />
      </>
      <>
        <h1 className="header">
          Youtube Video
          <img
            className="logoImg"
            src={youtubeLogo}
            onClick={() => redirectTo("https://www.youtube.com/")}
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingYoutubeVid(event.target.value)}
        />
      </>
      <>
        <h1 className="header">
          Youtube At
          <img
            className="logoImg"
            src={youtubeLogo}
            onClick={() => redirectTo("https://www.youtube.com/")}
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingYoutubeAt(event.target.value)}
        />
      </>
      <>
        <h1 className="header">
          Tiktok At
          <img
            className="logoImg"
            src={tiktokLogo}
            onClick={() => redirectTo("https://www.tiktok.com/")}
          />
        </h1>
        <input
          className="inputWidth"
          type="text"
          onChange={(event) => settingTiktokLink(event.target.value)}
        />
      </>
    </div>
  );
}
