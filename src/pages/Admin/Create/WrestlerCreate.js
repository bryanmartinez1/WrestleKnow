import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./create.css";
import Loading from "../Components/Loading";
import Sidebar from "../Components/Sidebar";
import ActivityDrop from "../Components/ActivityDrop";
import SocialMediaLinks from "../Components/SocialMediaLinks";
import placeHolderIMG from "../../../images/placeholder-image.png";
import Inputs from "../Components/Inputs.js";

const WrestlerCreate = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(placeHolderIMG);
  const [base64Img, setBase64Img] = useState("");
  const [companyPointer, setCompanyPointer] = useState("");
  const [active, setActive] = useState("Active");
  const [about, setAbout] = useState("");
  const [aka, setAKA] = useState("");
  const [from, setFrom] = useState("");
  const [date, onDateChange] = useState(new Date());
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeVid, setYoutubeVid] = useState("");
  const [youtubeAt, setYoutubeAt] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [threadsLink, setThreadsLink] = useState("");
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

  async function createWrestler() {
    if (image === placeHolderIMG) {
      alert("Please insert an Image for Wrestler");
      return;
    }
    const newWrestler = new Parse.Object("Wrestler");
    newWrestler.set("name", name);
    newWrestler.set(
      "image",
      new Parse.File(name + ".png", {
        base64: base64Img,
      })
    );
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
    newWrestler.set("youtube", youtubeVid);
    newWrestler.set("youtubeAt", youtubeAt);
    newWrestler.set("instagram", instagramLink);
    newWrestler.set("twitter", twitterLink);
    newWrestler.set("tiktok", tiktokLink);
    newWrestler.set("threads", threadsLink);
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
            <Inputs header="From" setHook={setFrom} />
            <Inputs header="AKA" setHook={setAKA} />
            <>
              <h1 className="header">About</h1>
              <textarea
                className="textAreaSize"
                type="text"
                onChange={(event) => setAbout(event.target.value)}
              />
            </>
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
              <h1 className="header">Pick Birthdate</h1>
              <Calendar
                className="calendarHeight"
                onChange={onDateChange}
                value={date}
                defaultView="century"
              />
            </>
          </div>
          <SocialMediaLinks
            //  Can Set
            can_set_company_pointer={true}
            can_set_twitter_at={true}
            can_set_instagram_at={true}
            can_set_tiktok_at={true}
            can_set_threads_at={true}
            can_set_youtube_at={true}
            can_set_youtube_vid={true}
            //  Hooks
            setCompanyPointer={setCompanyPointer}
            setTwitterAt={setTwitterLink}
            setInstagramAt={setInstagramLink}
            setYoutubeVid={setYoutubeVid}
            setYoutubeAt={setYoutubeAt}
            setTiktokAt={setTiktokLink}
            setThreadsLink={setThreadsLink}
          />
        </div>
        <button className="submitButton" onClick={() => createWrestler()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default WrestlerCreate;
