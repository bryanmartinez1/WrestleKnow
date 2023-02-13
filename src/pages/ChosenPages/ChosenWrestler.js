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

export default function ChosenWrestler() {
  const location = useLocation();
  const [name, setName] = useState();
  const [imgURL, setImgURL] = useState();
  const id = location.state.id;
  if (location === undefined) console.log("Bruh Its undefined");
  // new query using objectId
  async function innerQuery() {
    let query = new Parse.Query("Wrestler");
    try {
      query.equalTo("objectId", id);
      let results = await query.find();
      setName(results[0].get("name"));
      let img = results[0].get("image");
      let imgSRC = JSON.stringify(img).split('url":"').pop().slice(0, -2);
      setImgURL(imgSRC);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }
  innerQuery();

  return (
    <div className="body">
      <div className="inner-body">
        <div className="quickInfo">
          <img className="main-img " src={imgURL}></img>
        </div>
      </div>

      <div className="inner-body">Bruh</div>
    </div>
  );
}
