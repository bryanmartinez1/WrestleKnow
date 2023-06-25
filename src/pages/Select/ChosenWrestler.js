import "./styles/cw.css";
import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import InfoDisplay from "./Displays/InfoDisplay";
import SocialMedia from "./Displays/SocialMedia";
import QuickInfo from "./Displays/QuickInfo";
import ReignDescription from "./Displays/ReignDescription";

export default function ChosenWrestler() {
  const location = useLocation();
  const [showWrestler, setShowWrestler] = useState(false);
  const wrestlerObjectID = location.state.id;
  const [wrestlerInfo, setWrestlerInfo] = useState();
  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    if (!showWrestler) {
      wrestlerQuery();
    }
  });

  function age(date) {
    let dob = date;
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
  }
  function createBulletPointList(text) {
    return text.split(",");
  }

  async function companyQuery(companyID) {
    let companyParse = new Parse.Query("Company");
    companyParse.equalTo("objectId", companyID.id);
    try {
      const companyResults = await companyParse.find();
      const companyInfo = {
        name: companyResults[0].get("name"),
        image: JSON.stringify(companyResults[0].get("image"))
          .split('url":"')
          .pop()
          .slice(0, -2),
        id: companyResults[0].id,
      };
      return companyInfo;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  async function wrestlerQuery() {
    let wrestlerParse = new Parse.Query("Wrestler");
    wrestlerParse.equalTo("objectId", wrestlerObjectID);

    try {
      const wrestlerResults = await wrestlerParse.find();
      const wrestler = {
        name: wrestlerResults[0].get("name"),
        age: age(wrestlerResults[0].get("date")),
        image: JSON.stringify(wrestlerResults[0].get("image"))
          .split('url":"')
          .pop()
          .slice(0, -2),
        dateOfBirth: wrestlerResults[0]
          .get("date")
          .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
          .toString(),
        active: wrestlerResults[0].get("active"),
        from: wrestlerResults[0].get("from"),
        about: wrestlerResults[0].get("about"),
        aka: createBulletPointList(wrestlerResults[0].get("aka")),
        instagram: wrestlerResults[0].get("instagram"),
        twitter: wrestlerResults[0].get("twitter"),
        youtube: wrestlerResults[0].get("youtube"),
        tiktok: wrestlerResults[0].get("tiktok"),
        youtuber: wrestlerResults[0].get("youtubeAt"),
        company: wrestlerResults[0].get("Company"),
      };
      const company = await companyQuery(wrestler.company);
      setWrestlerInfo(wrestler);
      setCompanyInfo(company);
      setShowWrestler(true);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  return (
    <>
      {showWrestler && (
        <div className="selectHolder">
          <div className="wrestlerNameDiv">{wrestlerInfo.name}</div>
          <div className="otherInfo">
            <div className="leftSide">
              <div className="leftSideTop">
                <QuickInfo
                  imgSrc={wrestlerInfo.image}
                  companyName={companyInfo.name}
                  companyID={companyInfo.id}
                  topLeft={wrestlerInfo.dateOfBirth}
                  topRight={wrestlerInfo.age + " Years Old"}
                  bottomLeft={wrestlerInfo.active}
                  bottomRight={wrestlerInfo.from}
                />
                <InfoDisplay
                  title="About"
                  text={wrestlerInfo.about}
                  isList={false}
                />
              </div>
              <iframe
                className="ytVidChoosen"
                src={"https://www.youtube.com/embed/" + wrestlerInfo.youtube}
              />
            </div>
            <div className="leftSide">
              <div className="leftSideTop">
                <InfoDisplay
                  title="AKA"
                  text={wrestlerInfo.aka}
                  isList={true}
                />
                <SocialMedia
                  title="Social Media"
                  twitter={wrestlerInfo.twitter}
                  instagram={wrestlerInfo.instagram}
                  tiktok={wrestlerInfo.tiktok}
                  youtuber={wrestlerInfo.youtuber}
                />
              </div>
              <div className="reignDisplayHolder">
                <div className="infoDisplayTitle">Reign Description</div>
                <div className="searchBar"> Search</div>
                <div className="scrollReignDisplay">
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                  <ReignDescription />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
