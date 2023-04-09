import { React, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Sidebar from "../Components/Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./create.css";
import Dropdown from "../Components/Dropdown";

export default function CreateWrestler() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [companyPointer, setCompanyPointer] = useState("");
  const [active, setActive] = useState("");
  const [about, setAbout] = useState("");
  const [aka, setAKA] = useState("");
  const [from, setFrom] = useState("");
  const [date, onDateChange] = useState(new Date());
  const [twitterLink, setTwitterLink] = useState();
  const [instagramLink, setInstagramLink] = useState();
  const [youtubeLink, setYoutubeLink] = useState();

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
    try {
      const wrestler = await newWrestler.save();
      alert(name + " successfully added to database");
    } catch (error) {
      alert("Error while creating Wrestler" + error);
    }
  }
  const books = ["firstBook", "secondBook", "thirdBook"];
  return (
    <div className="createHolder">
      <Sidebar />
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
              <Dropdown setOption={setActive} />
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
                onChange={onDateChange}
                value={date}
                defaultView="century"
              />
            </div>
          </div>
          <div className="holderPage">
            <div>
              <h1 className="header">Company Pointer</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setCompanyPointer(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">Twitter</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setTwitterLink(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">Instagram</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setInstagramLink(event.target.value)}
              />
            </div>
            <div>
              <h1 className="header">Youtube Video</h1>
              <input
                className="inputWidth"
                type="text"
                onChange={(event) => setYoutubeLink(event.target.value)}
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
