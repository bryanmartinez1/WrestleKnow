import { React, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Sidebar from "../Components/Sidebar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./create.css";

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
    try {
      const wrestler = await newWrestler.save();
      alert(name + " successfully added to database");
    } catch (error) {
      alert("Error while creating Wrestler" + error);
    }
  }
  return (
    <div className="createHolder">
      <Sidebar />
      <div className="createWHolder">
        <div className="holderPage">
          <div>
            <p>Name</p>
            <input
              className="inputWidth"
              type="text"
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter Wrestler Name"
            />
          </div>
          <div>
            <p>Activity</p>
            <input
              className="inputWidth"
              type="text"
              onChange={(event) => setActive(event.target.value)}
              placeholder="Enter Wrestler Name"
            />
          </div>
          <div>
            <p>From</p>
            <input
              className="inputWidth"
              type="text"
              onChange={(event) => setFrom(event.target.value)}
              placeholder="Enter Wrestler Name"
            />
          </div>
          <div>
            <p>AKA</p>
            <input
              className="inputWidth"
              type="text"
              onChange={(event) => setAKA(event.target.value)}
              placeholder="Enter names wrestler is also known as"
            />
          </div>
          <div>
            <p>About</p>
            <textarea
              className="textAreaSize"
              type="text"
              onChange={(event) => setAbout(event.target.value)}
              placeholder="Where Wrestler is From"
            />
          </div>
          <div>
            <p>Company Pointer</p>
            <input
              className="inputWidth"
              type="text"
              onChange={(event) => setCompanyPointer(event.target.value)}
              placeholder="Enter names wrestler is also known as"
            />
          </div>
          <button className="submitButton" onClick={() => createWrestler()}>
            Submit
          </button>
        </div>
        <div className="holderPage">
          <div className="column-div">
            <p>Insert Image</p>
            <img className="imageSize" src={image} />
            <input
              type="file"
              id="image_input"
              name=""
              onChange={(event) => onImageChange(event)}
            />
          </div>
          <div>
            <p>Pick Birthdate</p>
            <Calendar
              onChange={onDateChange}
              value={date}
              defaultView="century"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
