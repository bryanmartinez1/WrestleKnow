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

  function bruh() {
    alert("bruh");
  }
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
      <div className="gap"></div>
      <div className="revealer" id="revealer">
        {revealUsername()}
      </div>
    </div>
  );
}
