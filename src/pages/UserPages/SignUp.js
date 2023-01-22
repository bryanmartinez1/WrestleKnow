import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./styles/signup.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  function refresh() {
    window.location.reload(false);
  }

  function logIn() {
    navigate("/login");
  }
  const signUp = async function () {
    if (password !== confirmPassword) {
      alert("Password do not match");
      return false;
    }
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    const firstNameValue = firstName;
    const laststNameValue = lastName;
    const emailValue = email;

    try {
      const user = new Parse.User();
      user.set("username", usernameValue);
      user.set("email", emailValue);
      user.set("password", passwordValue);
      user.set("firstName", firstNameValue);
      user.set("lastName", laststNameValue);

      const createdUser = await user.signUp();
      console.log(
        `Sign Up: User, ${createdUser.getUsername()} was successfully created and added to backend`
      );

      // Clear input fields
      setUsername("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");

      //Navigates back to Home after Log In
      navigate("/");
      // Refreshes page to update Navbar
      refresh();
      return true;
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      alert(`Error! ${error}`);
      return false;
    }
  };

  return (
    <div className="body">
      <div className="holder">
        <div className="title">Sign Up</div>

        <div className="div-holder">
          <div className="heading">Username</div>
          <input
            type="text"
            id="username"
            className="inputs"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter Username"
            maxLength="20"
          ></input>
        </div>
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
          <div className="heading">First Name</div>
          <input
            type="text"
            id="firstName"
            className="inputs"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Enter First name"
            maxLength="20"
          ></input>
        </div>
        <div className="div-holder">
          <div className="heading">Last Name</div>
          <input
            type="text"
            id="lastName"
            className="inputs"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Enter Last name"
            maxLength="20"
          ></input>
        </div>
        <div className="div-holder">
          <div className="heading">Password</div>
          <input
            type="password"
            id="password"
            className="inputs"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
          ></input>
        </div>
        <div className="div-holder">
          <div className="heading">Confirm Password</div>
          <input
            type="password"
            id="confirmPassword"
            className="inputs"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm Password"
          ></input>
        </div>
        <div className="div-holder">
          <button className="signUpButton" onClick={() => signUp()}>
            Sign Up
          </button>
        </div>
        <div className="already-holder">
          <button className="already-button" onClick={() => logIn()}>
            Already Have An Account?
          </button>
        </div>
      </div>
    </div>
  );
}
