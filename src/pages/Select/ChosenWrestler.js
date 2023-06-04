import "./styles/cw.css";
import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { type } from "@testing-library/user-event/dist/type";

export default function ChosenWrestler() {
  const location = useLocation();
  let display = false;
  const wrestlerID = location.state.id;
  const wrestlerObject = location.state.object;
  let a = typeof wrestlerObject;
  const myJSON = JSON.stringify(wrestlerObject);
  // const [name, setName] = useState();
  // const [imgURL, setImgURL] = useState();
  // const [from, setFrom] = useState();
  // const [companyID, setCompanyID] = useState();
  // const [date, setDate] = useState();
  // const [active, setActive] = useState();
  // const [about, setAbout] = useState();
  // const [aka, setAKA] = useState();
  // const [twitter, setTwitter] = useState();
  // const [instagram, setInstagram] = useState();
  // const [youtube, setYoutube] = useState();

  // Query is Started
  // async function startQuery() {
  //   const data = new Parse.Query("Wrestler");
  //   data.equalTo("objectId", wrestlerID);
  //   try {
  //     let wrestlerResults = await data.find();
  //     setName(wrestlerResults[0].get("name"));

  //     let img = wrestlerResults[0].get("image");
  //     let imgSRC = JSON.stringify(img).split('url":"').pop().slice(0, -2);
  //     setImgURL(imgSRC);

  //     setFrom(wrestlerResults[0].get("from"));
  //     // setCompanyID(wrestlerResults[0].get("Company"));
  //     setDate(wrestlerResults[0].get("date"));
  //     setActive(wrestlerResults[0].get("active"));
  //     setAbout(wrestlerResults[0].get("about"));
  //     setAKA(wrestlerResults[0].get("aka"));
  //     setYoutube(wrestlerResults[0].get("youtube"));
  //     setInstagram(wrestlerResults[0].get("instagram"));
  //     setTwitter(wrestlerResults[0].get("twitter"));
  //     display = true;
  //   } catch (error) {
  //     alert("Bruh" + JSON.stringify(error));
  //   }
  // }

  // function showResults() {
  //   return (
  //     <div>
  //       {wrestlerObject.get("from")}
  //       <img src={imgURL} />
  //     </div>
  //   );
  // }
  return <div>{myJSON}</div>;
}
