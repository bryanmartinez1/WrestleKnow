import React, { useCallback, useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import create from "./images/create_promo.png";
import "./styles/topbar.css";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import close_button from "./images/close.png";
import add_button from "./images/add.png";

export default function Topbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [content, setContent] = useState("");
  //  Create currentUser user id
  async function createPromo() {
    const newPromo = new Parse.Object("Promos");
    newPromo.set("content", content);
    newPromo.set("talker", currentUser.get("username"));
    try {
      const promo = await newPromo.save();
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

  return (
    <div className="topbarColor">
      <div className="nameBar">{props.name}</div>
      <img
        className="create"
        src={create}
        onClick={openModal}
        alt="Create Promo"
      ></img>
      <ModalTransition>
        {isOpen && (
          <Modal onClose={closeModal} width={"50%"} height={"75%"}>
            <div className="createPromoModalHeader">
              <h1>Cut a Promo</h1>
              <img
                className="closeModalButton"
                src={close_button}
                onClick={closeModal}
              />
            </div>
            <div className="createPromoModalBody">
              <textarea
                placeholder="enter promo here"
                className="createPromoTextBox"
                type="text"
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <ModalFooter>
              <img
                className="addModalButton"
                src={add_button}
                alt="Add Promo"
                onClick={() => createPromo()}
              />
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
