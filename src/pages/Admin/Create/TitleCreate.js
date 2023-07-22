import React, { useState } from "react";
import Loading from "../Components/Loading";
import Inputs from "../Components/Inputs.js";
import Sidebar from "../Components/Sidebar";
import ActivityDrop from "../Components/ActivityDrop";
import Parse from "parse/dist/parse.min.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./create.css";
import placeHolderIMG from "../../../images/placeholder-image.png";

const TitleCreate = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(placeHolderIMG);
  const [base64Img, setBase64Img] = useState("");
  const [active, setActive] = useState("Active");
  const [date, onDateChange] = useState(new Date());
  const [companyPointer, setCompanyPointer] = useState("");
  const [about, setAbout] = useState("");
  const [aka, setAKA] = useState("");
  const [uniqueChampions, setUniqueChampions] = useState("");
  const [youtubeVideo, setYoutubeVideo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      let result;

      const imageFile = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        result = event.target.result;
        setBase64Img(event.target.result.split("base64,").pop());
      });
      reader.readAsDataURL(imageFile);
    }
  }

  async function createTitle() {
    if (image === placeHolderIMG) {
      alert("Please insert an Image for Title");
      return;
    }
    const newTitle = new Parse.Object("Title");
    newTitle.set("name", name);
    newTitle.set(
      "image",
      new Parse.File(name + ".png", {
        base64: base64Img,
      })
    );
    let Company = new Parse.Object("Company");
    newTitle.set("Company", {
      __type: "Pointer",
      className: "Company",
      objectId: companyPointer,
    });
    newTitle.set("date", date);
    newTitle.set("active", active);
    newTitle.set("aka", aka);
    newTitle.set("about", about);
    newTitle.set("unique_champions", Number(uniqueChampions));
    newTitle.set("youtube_vid", youtubeVideo);
    newTitle.set("lower_name", name.toLowerCase());
    newTitle.set("lower_aka", aka.toLowerCase());
    try {
      setIsLoading(true);
      const title = await newTitle.save();
      setIsLoading(false);
      // alert(name + " successfully added to database");
      window.location.reload(false);
    } catch (error) {
      alert("Error while creating Title " + error);
      setIsLoading(false);
    }
  }

  return (
    <div className="createHolder">
      <Sidebar />
      {isLoading && <Loading />}
      <div className="rowDiv">
        <div className="createWHolder">
          <div className="holderPage">
            <Inputs header="Name" setHook={setName} />
            <>
              <h1 className="header">Activity</h1>
              <ActivityDrop setOption={setActive} />
            </>
            <Inputs header="Unique Champions" setHook={setUniqueChampions} />
            <Inputs header="Company Pointer" setHook={setCompanyPointer} />
            <Inputs header="Youtube Video" setHook={setYoutubeVideo} />
          </div>
          <div className="holderPage">
            <div className="column-div">
              <h1 className="header">Insert Image</h1>
              <img className="imageSize" src={image} />
              <input
                type="file"
                id="image_input"
                name=""
                onChange={(event) => onImageChange(event)}
              />
            </div>
            <>
              <h1 className="header">Pick Title Introduction</h1>
              <Calendar
                className="calendarHeight"
                onChange={onDateChange}
                value={date}
                defaultView="century"
              />
            </>
          </div>
          <div className="holderPage">
            <h1 className="header">AKA</h1>
            <textarea
              className="textAreaSize"
              type="text"
              onChange={(event) => setAKA(event.target.value)}
            />
            <h1 className="header">About</h1>
            <textarea
              className="textAreaSize"
              type="text"
              onChange={(event) => setAbout(event.target.value)}
            />
          </div>
        </div>
        <button className="submitButton" onClick={() => createTitle()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default TitleCreate;
