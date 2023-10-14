import React, { useCallback, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import create from "./images/create_promo.png";
import "./styles/topbar.css";
import Modal, { ModalFooter } from "@atlaskit/modal-dialog";
import close_button from "./images/close.png";
import add_button from "./images/add.png";
import Loading from "../../Components/Loading";

export default function Topbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(undefined);
  const [base64Img, setBase64Img] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  //  Create currentUser user id
  async function createPromo() {
    const newPromo = new Parse.Object("Promos");
    newPromo.set("content", content);
    newPromo.set("talker", currentUser.get("username"));
    if (base64Img !== undefined) {
      newPromo.set(
        "image",
        new Parse.File("img" + ".png", {
          base64: base64Img,
        })
      );
    }
    if (videoURL !== undefined) {
      newPromo.set(
        "vid",
        new Parse.File("vid" + ".mp4", {
          base64: base64Video,
        })
      );
    }
    try {
      setIsLoading(true);
      const promo = await newPromo.save();
      setIsLoading(false);
      window.location.reload(false);
    } catch (error) {
      alert("Error while creating Promo" + error);
    }
    window.location.reload(true);
  }

  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  useEffect(() => {
    getCurrentUser();
  }, [currentUser]);

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
  function clearImage() {
    setImage(undefined);
    setBase64Img(undefined);
    document.getElementById("imageInputID").value = "";
  }
  useEffect(() => {}, [image, base64Img]);

  const [videoURL, setVideoURL] = useState(undefined);
  const [base64Video, setBase64Video] = useState(undefined);
  function onVideoChange(e) {
    let videofile = e.target.files[0];
    if (videofile) {
      setVideoURL(URL.createObjectURL(videofile));
      let result;

      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        result = event.target.result;
        setBase64Video(event.target.result.split("base64,").pop());
      });
      reader.readAsDataURL(videofile);
    }
  }

  function clearVideo() {
    setVideoURL(undefined);
    setBase64Video(undefined);
    document.getElementById("vidInputID").value = "";
  }

  useEffect(() => {}, [videoURL, base64Video]);

  return (
    <div className="topbarColor">
      <div className="nameBar">{props.name}</div>
      <img
        className="create"
        src={create}
        onClick={openModal}
        alt="Create Promo"
      ></img>
      {isOpen && (
        <Modal onClose={closeModal} width={"75%"} height={"75%"}>
          {isLoading && <Loading />}
          <div className="createPromoModalHeader">
            <h1>Cut a Promo</h1>
            <img
              className="closeModalButton"
              src={close_button}
              onClick={closeModal}
            />
          </div>
          <div className="createPromoModalBody">
            {videoURL !== undefined && (
              <div>
                <video src={videoURL} width="300" controls />
                <button onClick={() => clearVideo()}>Clear Video</button>
              </div>
            )}
            {image !== undefined && (
              <div>
                <img src={image} className="inputImage" />
                <button onClick={() => clearImage()}>Clear Image</button>
              </div>
            )}
            <textarea
              placeholder="enter promo here"
              className="createPromoTextBox"
              type="text"
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <ModalFooter>
            <div className="whattoInsert">
              <h1>Insert Image</h1>
              <input
                id="imageInputID"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => onImageChange(event)}
              />
            </div>
            <div className="whattoInsert">
              <h1>Insert Video</h1>
              <input
                id="vidInputID"
                type="file"
                accept="video/mp4"
                onChange={(event) => onVideoChange(event)}
              />
            </div>
            <img
              className="addModalButton"
              src={add_button}
              alt="Add Promo"
              onClick={() => createPromo()}
            />
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
