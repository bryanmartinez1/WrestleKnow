import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  function refresh() {
    window.location.reload(false);
  }

  const logIn = async function () {
    const user = username;
    const pw = password;
    try {
      const loggedInUser = await Parse.User.logIn(user, pw);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          "username"
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername("");
      setPassword("");
      // Update state variable holding current user
      getCurrentUser();
      //Navigates back to Home after Log In
      navigate("/");
      // Refreshes page to update Navbar
      refresh();
      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  return (
    <div className="body">
      <div className="title">LogIn</div>
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
        <div className="heading">Password</div>
        <input
          type="password"
          id="password"
          display="block"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter Password"
        ></input>
      </div>
      <button onClick={logIn}>Submit</button>
    </div>
  );
}
