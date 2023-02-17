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
import { useLocation, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./styles/cw.css";
import InfoDisplay from "./Displays/InfoDisplay";
import MediaDisplay from "./Displays/MediaDisplay";
import QuickInfo from "./Displays/QuickInfo";
import { Link } from "react-router-dom";

export default function ChosenWrestler() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state.id;
  const [name, setName] = useState();
  const [imgURL, setImgURL] = useState();
  const [height, setHeight] = useState();
  const [dateOfbirth, setDateOfBirth] = useState();
  const [age, setAge] = useState();
  const [from, setFrom] = useState();
  const [about, setAbout] = useState();
  const [moves, setMoves] = useState();
  const [aka, setAKA] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [youtube, setYouTube] = useState();
  const [companyID, setCompanyID] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyImg, setCompanyImg] = useState();

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
      setAKA(results[0].get("aka"));

      let compId = JSON.stringify(results[0].get("company"));
      setCompanyID(compId.split('":"').pop().slice(0, -2));

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

  async function companyQuery() {
    let companyQuery = new Parse.Query("Company");
    try {
      companyQuery.equalTo("objectId", companyID);
      let companyResults = await companyQuery.find();
      setCompanyName(companyResults[0].get("shortName"));
      let compSRC = companyResults[0].get("image");
      let compIMG = JSON.stringify(compSRC).split('url":"').pop().slice(0, -2);
      setCompanyImg(compIMG);

      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }
  companyQuery();
  let youtubeURL = "https://www.youtube.com/embed/";

  return (
    <div className="displayBody">
      <div className="leftBody">
        <div className="leftInside">
          <QuickInfo
            pic={imgURL}
            name={name}
            info1={dateOfbirth}
            info2={age}
            info3={height}
            info4={from}
          ></QuickInfo>
          <div className="leftInsideRight">
            <InfoDisplay title="About" text={about} />
            <div className="companyBox">
              <h1 className="companyHeader">Currently At</h1>
              <Link
                className="linkButton"
                to={"/company/chosencompany"}
                state={{ id: companyID }}
              >
                <img className="compImg" src={companyImg}></img>
                {companyName}
              </Link>
            </div>
          </div>
        </div>
        <iframe width="720" height="405" src={youtubeURL + youtube} />
      </div>
      <div className="rightBody">
        <InfoDisplay title="Moves" text={moves} />
        <InfoDisplay title="Moves" text={moves} />
        <MediaDisplay twitter={twitter} instagram={instagram} />
      </div>
    </div>
  );
}
