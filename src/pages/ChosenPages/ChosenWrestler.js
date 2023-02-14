/*
Chosen Wrestler Page will display
    - Info on the Wrestler chosen by user including
        - name
        - age
        - birhtdate
        - height
        - about
        - also known as
        - social media links
        - accomplishments
        - notable moves
        - description of title reigns
    - YouTube Frame will be poresent on the bottom left corner in where a video about chosen Wrestler can be played and viewed by user
*/

import { useState } from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./styles/cw.css";
import twitterImg from "./images/twitter.png";
import instagramImg from "./images/instagram.png";

export default function ChosenWrestler() {
  const location = useLocation();
  const id = location.state.id;
  const [name, setName] = useState();
  const [imgURL, setImgURL] = useState();
  const [height, setHeight] = useState();
  const [dateOfbirth, setDateOfBirth] = useState();
  const [age, setAge] = useState();
  const [from, setFrom] = useState();
  const [about, setAbout] = useState();
  const [moves, setMoves] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [youtube, setYouTube] = useState();
  let instagramURL = "https://www.instagram.com/";
  let twitterURL = "https://www.twitter.com/";
  const [companyID, setCompanyID] = useState();
  const [company, setCompany] = useState();

  // new query using objectId
  async function infoQuery() {
    let query = new Parse.Query("Wrestler");
    try {
      query.equalTo("objectId", id);
      let results = await query.find();
      setName(results[0].get("name"));
      let img = results[0].get("image");
      let imgSRC = JSON.stringify(img).split('url":"').pop().slice(0, -2);
      setImgURL(imgSRC);
      setHeight(results[0].get("height"));
      setFrom(results[0].get("from"));
      setAbout(results[0].get("about"));
      setTwitter(results[0].get("twitter"));
      setInstagram(results[0].get("instagram"));
      setMoves(results[0].get("notableMoves"));
      setYouTube(results[0].get("youtube"));
      //The Birthdate & Age Stuff
      let dob = JSON.stringify(results[0].get("birth"));
      //));
      setDateOfBirth(dob.substring(1, 11));
      //Gets the Age from Date inserted
      //calculate month difference from current date in time
      var month_diff = Date.now() - results[0].get("birth").getTime();
      //convert the calculated difference in date format
      var age_dt = new Date(month_diff);
      //extract year from date
      var year = age_dt.getUTCFullYear();
      //now calculate the age of the user
      setAge(Math.abs(year - 1970));
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }
  infoQuery();
  let youtubeURL = "https://www.youtube.com/embed/";

  return (
    <div className="body">
      <div className="inner-body">
        <div className="quickInfo">
          <img className="main-img " src={imgURL}></img>
          <div className="nameHolder">{name}</div>
          <div className="boxHolder">
            <div className="infoBox">{height}</div>
            <div className="verticalDiv" />
            <div className="infoBox">{age} Years Old</div>
          </div>
          <div className="boxHolder">
            <div className="infoBox">{dateOfbirth}</div>
            <div className="verticalDiv" />
            <div className="infoBox">{from}</div>
          </div>
        </div>
        <div className="spacing" />
        <div className="anotherHolder">
          <div className="smallBox">
            <h1 className="boxHeader">About</h1>
            {about}
          </div>
          <div className="spacing" />
          <div className="smallBox">
            <h1 className="boxHeader">Moves</h1>
            {moves}
          </div>
          <div className="spacing" />
          <div className="vertcalSpacing" />
          <div className="smallBox">
            <h1 className="boxHeader">About</h1>
            {about}
          </div>
          <div className="spacing" />
          <div className="smallBox">
            <h1 className="boxHeader">Socials</h1>
            <a
              className="linkButton"
              href={twitterURL + twitter}
              target="_blank"
            >
              <img className="linkImg" src={twitterImg}></img> @{twitter}
            </a>
            <a
              className="linkButton"
              href={instagramURL + instagram}
              target="_blank"
            >
              <img className="linkImg" src={instagramImg}></img>@{instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="inner-body">
        <iframe width="720" height="405" src={youtubeURL + youtube} />
      </div>
    </div>
  );
}
