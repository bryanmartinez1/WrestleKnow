import { React, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Sidebar from "../Components/Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./create.css";
import Loading from "../Components/Loading";
import ActivityDrop from "../Components/ActivityDrop";
import twitterLogo from "../../../images/twitterLogo.png";
import instagramLogo from "../../../images/instagramLogo.png";
import youtubeLogo from "../../../images/youtubeLogo.png";
import tiktokLogo from "../../../images/tiktokLogo.png";
import placeHolderIMG from "../../../images/placeholder-image.png";
import googleSheetsLogo from "../../../images/googleSheetsLogo.png";

export default function CreateWrestler() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(placeHolderIMG);
  const [base64Img, setBase64Img] = useState("");
  const [companyPointer, setCompanyPointer] = useState("");
  const [active, setActive] = useState("Active");
  const [about, setAbout] = useState("");
  const [aka, setAKA] = useState("");
  const [from, setFrom] = useState("");
  const [date, onDateChange] = useState(new Date());
  const [twitterLink, setTwitterLink] = useState();
  const [instagramLink, setInstagramLink] = useState();
  const [youtubeLink, setYoutubeLink] = useState();
  const [tiktokLink, setTiktokLink] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));

      let result;

      const imageFile = event.target.files[0];
      console.log(imageFile);
      console.log(image);
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        result = event.target.result;
        setBase64Img(event.target.result.split("base64,").pop());
      });
      reader.readAsDataURL(imageFile);
    }
  }

  async function createWrestler() {
    if (image === placeHolderIMG) {
      alert("Please insert an Image for Wrestler");
      return;
    }
    const newWrestler = new Parse.Object("Wrestler");
    newWrestler.set("name", name);
    newWrestler.set(
      "image",
      new Parse.File("wrestler.png", {
        base64: base64Img,
      })
    );
    var Company = new Parse.Object("Company");
    newWrestler.set("Company", {
      __type: "Pointer",
      className: "Company",
      objectId: companyPointer,
    });
    newWrestler.set("date", date);
    newWrestler.set("active", active);
    newWrestler.set("about", about);
    newWrestler.set("aka", aka);
    newWrestler.set("from", from);
    newWrestler.set("lower_name", name.toLowerCase());
    newWrestler.set("lower_aka", aka.toLowerCase());

    let ytId = youtubeLink.substring(
      youtubeLink.indexOf("=") + 1,
      youtubeLink[-1]
    );
    newWrestler.set("youtube", ytId);
    newWrestler.set("instagram", instagramLink);
    newWrestler.set("twitter", twitterLink);
    newWrestler.set("tiktok", tiktokLink);
    try {
      setIsLoading(true);
      const wrestler = await newWrestler.save();
      setIsLoading(false);
      // alert(name + " successfully added to database");
      window.location.reload(false);
    } catch (error) {
      alert("Error while creating Wrestler" + error);
    }
  }
  const books = ["firstBook", "secondBook", "thirdBook"];
  return (
    <div className="createHolder">
      <Sidebar />
      {isLoading && <Loading />}
      <div className="rowDiv">
        <div className="createWHolder">
          <div className="holderPage">
            <div>
              <h1 className="header">Name</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">Activity</h1>
              <ActivityDrop setOption={setActive} />
            </div>
            <div>
              <h1 className="header">From</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setFrom(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">AKA</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setAKA(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">About</h1>
              <textarea
                className="textAreaSize"
                type="text"
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>
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
            <div>
              <h1 className="header">Pick Birthdate</h1>
              <Calendar
                className="calendarHeight"
                onChange={onDateChange}
                value={date}
                defaultView="century"
              />
            </div>
          </div>
          <div className="holderPage">
            <div>
              <h1 className="header">
                Company Pointer
                <img className="logoImg" src={googleSheetsLogo} />
              </h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setCompanyPointer(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">
                Twitter
                <img className="logoImg" src={twitterLogo} />
              </h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setTwitterLink(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">
                Instagram
                <img className="logoImg" src={instagramLogo} />
              </h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setInstagramLink(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">
                Youtube Video
                <img className="logoImg" src={youtubeLogo} />
              </h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setYoutubeLink(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">
                Tiktok
                <img className="logoImg" src={tiktokLogo} />
              </h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setTiktokLink(event.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="submitButton" onClick={() => createWrestler()}>
          Submit
        </button>
      </div>
    </div>
  );
}
