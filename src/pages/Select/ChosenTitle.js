/*
Chosen Title Page will display
    - Info on the Title chosen by user including
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
    - YouTube Frame will be poresent on the bottom left corner in where a video about chosen Title can be played and viewed by user
*/
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ChosenTitle() {
  const location = useLocation();
  const id = location.state.id;
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [companyID, setCompanyID] = useState();
  const [companyName, setCompanyName] = useState();
  const [active, setActive] = useState();
  const [about, setAbout] = useState();
  const [youtubeLink, setYouTubeLink] = useState();
  const [created, setCreated] = useState();
  const [age, setAge] = useState();

  // new query using objectId
  async function infoQuery() {
    let query = new Parse.Query("Title");
    try {
      query.equalTo("objectId", id);
      let results = await query.find();
      setName(results[0].get("name"));
      let img = results[0].get("image");
      let imgSRC = JSON.stringify(img).split('url":"').pop().slice(0, -2);
      setImage(imgSRC);
      setYouTubeLink(results[0].get("youtube"));
      if (results[0].get("active") === true) {
        setActive("Active");
      } else {
        setActive("Inactive");
      }
      setAbout(results[0].get("about"));

      //The Birthdate & Age Stuff
      let dob = JSON.stringify(results[0].get("introduced"));
      //));
      setCreated(dob.substring(1, 11));
      //Gets the Age from Date inserted
      //calculate month difference from current date in time
      var month_diff = Date.now() - results[0].get("introduced").getTime();
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

  return <h1>{id}</h1>;
}
