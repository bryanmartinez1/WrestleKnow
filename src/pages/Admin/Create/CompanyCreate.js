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

const CompanyCreate = () => {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [image, setImage] = useState(placeHolderIMG);
  const [base64Img, setBase64Img] = useState("");
  const [active, setActive] = useState("Active");
  const [about, setAbout] = useState("");
  const [date, onDateChange] = useState(new Date());
  const [endDate, onEndDateChange] = useState(new Date());
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeVid, setYoutubeVid] = useState("");
  const [youtubeAt, setYoutubeAt] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [threadsLink, setThreadsLink] = useState("");
  const [aka, setAKA] = useState("");
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

  async function createCompany() {
    if (image === placeHolderIMG) {
      alert("Please insert an Image for Company");
      return;
    }
    const newCompany = new Parse.Object("Company");
    newCompany.set("name", name);
    newCompany.set(
      "image",
      new Parse.File(name + ".png", {
        base64: base64Img,
      })
    );
    newCompany.set("date", date);
    newCompany.set("active", active);
    newCompany.set("about", about);
    newCompany.set("shortName", shortName);
    newCompany.set("lower_short_name", shortName.toLowerCase());
    newCompany.set("lower_name", name.toLowerCase());
    newCompany.set("youtube_vid", youtubeVid);
    newCompany.set("youtube_at", youtubeAt);
    newCompany.set("instagram_at", instagramLink);
    newCompany.set("twitter_at", twitterLink);
    newCompany.set("tiktok_at", tiktokLink);
    newCompany.set("threads_at", threadsLink);
    newCompany.set("aka", aka);
    newCompany.set("lower_aka", aka.toLowerCase());
    if (active === "Defunct") {
      newCompany.set("end_date", endDate);
    }
    try {
      setIsLoading(true);
      const company = await newCompany.save();
      setIsLoading(false);
      // alert(name + " successfully added to database");
      window.location.reload(false);
    } catch (error) {
      alert("Error while creating Company" + error);
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
              <ActivityDrop setOption={setActive} retireOrDefunct="Defunct" />
            </>
            <Inputs header="Abbreviated Name" setHook={setShortName} />
            <Inputs header="AKA" setHook={setAKA} />
            <SocialMediaLinks
              //  Can Set
              can_set_company_pointer={false}
              can_set_twitter_at={true}
              can_set_instagram_at={true}
              can_set_tiktok_at={true}
              can_set_threads_at={true}
              can_set_youtube_at={true}
              can_set_youtube_vid={true}
              //  Set Hooks
              setTwitterAt={setTwitterLink}
              setInstagramAt={setInstagramLink}
              setYoutubeVid={setYoutubeVid}
              setYoutubeAt={setYoutubeAt}
              setTiktokAt={setTiktokLink}
              setThreadsLink={setThreadsLink}
            />
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
              <h1 className="header">About</h1>
              <textarea
                className="textAreaSize"
                type="text"
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>
          </div>
          <div className="holderPage">
            <h1 className="header">Pick Found Date</h1>
            <Calendar
              className="calendarHeight"
              onChange={onDateChange}
              value={date}
              defaultView="century"
            />
            {active === "Defunct" && (
              <>
                <h1 className="header">Pick End Date</h1>
                <Calendar
                  className="calendarHeight"
                  onChange={onEndDateChange}
                  value={endDate}
                  defaultView="century"
                />
              </>
            )}
          </div>
        </div>
        <button className="submitButton" onClick={() => createCompany()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CompanyCreate;
