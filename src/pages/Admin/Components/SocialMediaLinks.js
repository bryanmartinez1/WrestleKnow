import React from "react";
import "./styles/socialMediaLinks.css";
import twitterLogo from "../../../images/twitterLogo.png";
import instagramLogo from "../../../images/instagramLogo.png";
import youtubeLogo from "../../../images/youtubeLogo.png";
import tiktokLogo from "../../../images/tiktokLogo.png";
import googleSheetsLogo from "../../../images/googleSheetsLogo.png";
import threadsLogo from "../../../images/Threads.png";

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
    props.setTwitterAt(value);
  }
  function settingInstagramAt(value) {
    props.setInstagramAt(value);
  }
  function settingTiktokLink(value) {
    props.setTiktokAt(value);
  }
  function settingYoutubeAt(value) {
    props.setYoutubeAt(value);
  }
  function settingYoutubeVid(value) {
    props.setYoutubeVid(value);
  }
  function settingThreadsLink(value) {
    props.setThreadsLink(value);
  }
  return (
    <div className="holderPage">
      {/* can_set_company_pointer={false}
            can_set_twitter_at={false}
            can_set_instagram_at={false}
            can_set_tiktok_at={false}
            can_set_youtube_at={false}
            can_set_youtube_vid={true} */}
      {props.can_set_company_pointer && (
        <>
          <h1 className="header">
            Company Pointer
            <img
              className="logoImg"
              alt="Google Sheets Logo"
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
      )}
      {props.can_set_twitter_at && (
        <>
          <h1 className="header">
            Twitter At
            <img
              className="logoImg"
              src={twitterLogo}
              alt="Twitter Logo"
              onClick={() => redirectTo("https://www.twitter.com/")}
            />
          </h1>
          <input
            className="inputWidth"
            type="text"
            onChange={(event) => settingTwitterLink(event.target.value)}
          />
        </>
      )}
      {props.can_set_instagram_at && (
        <>
          <h1 className="header">
            Instagram At
            <img
              className="logoImg"
              alt="Instgram Logo"
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
      )}
      {props.can_set_tiktok_at && (
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
      )}
      {props.can_set_threads_at && (
        <>
          <h1 className="header">
            Threads At
            <img
              className="logoImg"
              alt="Threads Logo"
              src={threadsLogo}
              onClick={() => redirectTo("https://www.threads.net")}
            />
          </h1>
          <input
            className="inputWidth"
            type="text"
            onChange={(event) => settingThreadsLink(event.target.value)}
          />
        </>
      )}
      {props.can_set_youtube_at && (
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
      )}
      {props.can_set_youtube_vid && (
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
      )}
    </div>
  );
}
