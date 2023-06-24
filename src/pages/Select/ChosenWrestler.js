import "./styles/cw.css";
import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import InfoDisplay from "./Displays/InfoDisplay";
import SocialMedia from "./Displays/SocialMedia";
import QuickInfo from "./Displays/QuickInfo";

export default function ChosenWrestler() {
  const location = useLocation();
  const [showWrestler, setShowWrestler] = useState(false);
  const wrestlerObject = location.state.object;
  const [wrestlerInfo, setWrestlerInfo] = useState();

  if (showWrestler === false) {
    wrestlerQuery();
  }

  function wrestlerAge(date) {
    let dob = date;
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970);
  }

  async function wrestlerQuery() {
    let wrestlerParse = new Parse.Query(wrestlerObject.className);
    wrestlerParse.equalTo("objectId", wrestlerObject.id);

    try {
      const wrestlerResults = await wrestlerParse.find();
      console.log(wrestlerResults);
      const wrestler = {
        name: wrestlerResults[0].get("name"),
        age: wrestlerAge(wrestlerResults[0].get("date")),
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
        aka: wrestlerResults[0].get("aka"),
        instagram: wrestlerResults[0].get("instagram"),
        twitter: wrestlerResults[0].get("twitter"),
        youtube: wrestlerResults[0].get("youtube"),
        tiktok: wrestlerResults[0].get("tiktok"),
        youtuber: wrestlerResults[0].get("youtubeAt"),
      };

      setWrestlerInfo(wrestler);
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
            <QuickInfo
              imgSrc={wrestlerInfo.image}
              topLeft={wrestlerInfo.dateOfBirth}
              topRight={wrestlerInfo.age + " Years Old"}
              bottomLeft={wrestlerInfo.active}
              bottomRight={wrestlerInfo.from}
            />
            <InfoDisplay title="About" text={wrestlerInfo.about} />
            <InfoDisplay title="AKA" text={wrestlerInfo.aka} />
            <SocialMedia
              title="Social Media"
              twitter={wrestlerInfo.twitter}
              instagram={wrestlerInfo.instagram}
              tiktok={wrestlerInfo.tiktok}
              youtuber={wrestlerInfo.youtuber}
            />
            <iframe
              className="ytVid"
              src={"https://www.youtube.com/embed/" + wrestlerInfo.youtube}
            />
          </div>
        </div>
      )}
    </>
  );
}
