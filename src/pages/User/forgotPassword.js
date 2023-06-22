import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./styles/forgot.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function navigatePage(link) {
    navigate(link);
  }

  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;

    try {
      await Parse.User.requestPasswordReset(emailValue);
      alert(`Success! Please check ${email} to proceed with password reset.`);
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
        <div className="title">Reset Password</div>

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
          <button
            className="forgotButton"
            onClick={() => doRequestPasswordReset()}
          >
            Submit
          </button>
        </div>

        <div className="already-holder">
          <button
            className="already-button"
            onClick={() => navigatePage("/login")}
          >
            Remember Password?
          </button>

          <button
            className="already-button"
            onClick={() => navigatePage("/username")}
          >
            Forgot Username?
          </button>
        </div>
      </div>
    </div>
  );
}
