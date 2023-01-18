import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./styles/login.css";
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
      alert(
        `Success! User ${createdUser.getUsername()} was successfully created!`
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
      <div className="title">SignUp</div>
      <div className="container">
        <div className="heading">Username</div>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter Username"
          maxLength="20"
        ></input>
      </div>
      <div className="container">
        <div className="heading">Email</div>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter Password"
        ></input>
      </div>
      <div className="container">
        <div className="heading">First Name</div>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Enter First name"
          maxLength="20"
        ></input>
      </div>
      <div className="container">
        <div className="heading">Last Name</div>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Enter Last name"
          maxLength="20"
        ></input>
      </div>
      <div className="container">
        <div className="heading">Password</div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter Password"
        ></input>
      </div>
      <div className="container">
        <div className="heading">ConfirmPassword</div>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm Password"
        ></input>
      </div>
      <button onClick={() => signUp()}>Sign Up</button>
    </div>
  );
}
