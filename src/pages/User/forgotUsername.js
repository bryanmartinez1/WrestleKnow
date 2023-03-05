import { queryAllByAltText } from "@testing-library/react";
import Parse from "parse/dist/parse.min.js";
import React, { useState } from "react";
import "./styles/forgot.css";

export default function ForgotUserName() {
  const [email, setEmail] = useState("");
  const [num, setNum] = useState(0);

  function reveal() {
    document.getElementById("revealer").style.display = "block";
  }
  function revealUsername() {
    let username = "am";
    return username + email;
  }

  const findUsername = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;

    try {
      await Parse.User.requestPasswordReset(emailValue);
      alert(
        `Success! Please check ${email}, to view username, and also have the ability to update password`
      );
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error}`);
      return false;
    }
  };
  return (
    <div className="body">
      <div className="holder">
        <div className="title">Finding Username</div>

        <div className="div-holder">
          <div className="heading">Email</div>
          <input
            type="text"
            id="email"
            className="inputs"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter Email"
          ></input>
        </div>
        <div className="div-holder">
          <button className="forgotButton" onClick={() => reveal()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
