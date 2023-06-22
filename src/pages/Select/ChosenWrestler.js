import "./styles/cw.css";
import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { type } from "@testing-library/user-event/dist/type";

export default function ChosenWrestler() {
  const location = useLocation();
  const [showWrestler, setShowWrestler] = useState(false);
  const [queryResults, setQueryResults] = useState();
  const wrestlerObject = location.state.object;
  const [wrestlerInfo, setWrestlerInfo] = useState();

  if (showWrestler === false) {
    wrestlerQuery();
  }

  function wrestlerAge(date) {
    let dob = date;
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);
    //extract year from date
    var year = age_dt.getUTCFullYear();
    //now calculate the age of the user
    return Math.abs(year - 1970);

    // let image = JSON.stringify(props.imageSRC).split('url":"').pop().slice(0, -2);
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
        active: wrestlerResults[0].get("active"),
        from: wrestlerResults[0].get("from"),
        about: wrestlerResults[0].get("about"),
        aka: wrestlerResults[0].get("aka"),
        instagram: wrestlerResults[0].get("instagram"),
        twitter: wrestlerResults[0].get("twitter"),
        youtube: wrestlerResults[0].get("youtube"),
        tiktok: wrestlerResults[0].get("tiktok"),
        youtuberAt: wrestlerResults[0].get("youtuberAt"),
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
        <>
          <img src={wrestlerInfo.image} />
          {wrestlerInfo.name}
          {wrestlerInfo.age}
          {wrestlerInfo.active}
          {wrestlerInfo.from}
          {wrestlerInfo.about}
          {wrestlerInfo.aka}
          {wrestlerInfo.instagram}
          {wrestlerInfo.twitter}
          {wrestlerInfo.youtube}
          {wrestlerInfo.tiktok}
          {wrestlerInfo.youtuberAt}
        </>
      )}
    </>
  );
}
