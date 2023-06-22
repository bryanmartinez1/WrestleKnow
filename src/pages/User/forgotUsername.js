import Parse from "parse/dist/parse.min.js";
import React, { useState } from "react";
import "./styles/forgot.css";
import { useNavigate } from "react-router-dom";

export default function ForgotUserName() {
  const [email, setEmail] = useState("");
  const [num, setNum] = useState(0);

  const navigate = useNavigate();

  function reveal() {
    document.getElementById("revealer").style.display = "block";
  }
  function navigatePage(link) {
    navigate(link);
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
        <div className="already-holder">
          <button
            className="already-button"
            onClick={() => navigatePage("/login")}
          >
            Remember Username?
          </button>

          <button
            className="already-button"
            onClick={() => navigatePage("/password")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
