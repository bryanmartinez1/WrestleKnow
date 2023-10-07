import React from "react";
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
  // Checks to see if atleast one number is present in the string
  function hasNumber(string) {
    return /\d/.test(string);
  }
  function hasSpecialCharacter(string) {
    return /[!#$%&?]/g.test(string);
  }

  function logIn() {
    navigate("/login");
  }
  const signUp = async function () {
    if (username.includes("/")) {
      alert("Cannot have / in your username");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Password do not match");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return false;
    }
    if (!hasNumber(password)) {
      alert("Password must have atleast 1 number");
      return false;
    }
    if (!hasSpecialCharacter(password)) {
      alert("Password must have atleast 1 of the following !, #, $, %, &, ?");
      return false;
    }
    if (password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return false;
    }
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    const firstNameValue = firstName;
    const lastNameValue = lastName;
    const emailValue = email;

    try {
      const user = new Parse.User();
      user.set("username", usernameValue);
      user.set("email", emailValue);
      user.set("password", passwordValue);
      user.set("firstName", firstNameValue);
      user.set("lastName", lastNameValue);

      const createdUser = await user.signUp();

      const setGPProfile = new Parse.Object("GP_Profile");
      setGPProfile.set("username", usernameValue);
      setGPProfile.set("first_name", firstNameValue);
      setGPProfile.set("last_name", lastNameValue);
      setGPProfile.set("bio", " ");
      try {
        const gpProfile = await setGPProfile.save();
      } catch (error) {
        alert("Error while creating GP Profile: " + error);
      }

      console.log(
        `Sign Up: User, ${createdUser.getUsername()} was successfully created and added to backend`
      );

      await Parse.User.logOut();

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
            maxLength="24"
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
