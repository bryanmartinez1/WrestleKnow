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

export default function Topbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const [content, setContent] = useState("");
  //  Create currentUser user id
  async function createPromo() {
    const newPromo = new Parse.Object("Promos");
    newPromo.set("content", content);

    newPromo.set("talker", {
      __type: "Pointer",
      className: "_User",
      objectId: currentUser.id,
    });
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
          <Modal onClose={closeModal} width={"50%"} height={"50%"}>
            <ModalHeader>
              <ModalTitle>Create Promo</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <textarea
                className="createPromoTextBox"
                type="text"
                onChange={(event) => setContent(event.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <button onClick={() => createPromo()}>Create</button>
            </ModalFooter>
          </Modal>
        )}
      </ModalTransition>
    </div>
  );
}
