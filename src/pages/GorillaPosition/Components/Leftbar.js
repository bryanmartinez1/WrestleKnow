import { Link, useNavigate } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./images/profile_icon.png";

export default function Leftbar(props) {
  const navigate = useNavigate();
  function toFeed() {
    navigate("/gp");
  }
  function toFollow() {
    navigate("/gp/follow");
  }

  // Get Current User Function
  return (
    <div className="leftside">
      <img className="pfp" src={props.pfp} onClick={() => toFeed()} />
      <div className="names" onClick={() => toFeed()}>
        {props.firstName} {props.lastName}
      </div>
      <div className="names" onClick={() => toFeed()}>
        {props.userName}
      </div>
      <Link className="link">10 Promos</Link>
      <Link className="link" to="/gp/follow">
        10 Followers 400 Following{" "}
      </Link>
      <div className="bio">{props.bio}</div>
      <Link className="link" to="/gp/bookmarks">
        View Bookmarks
      </Link>
      <Link className="link" to="/gp/messages">
        View Messages
      </Link>
      <Link className="link" to="/gp/searchresults">
        Search
      </Link>
    </div>
  );
}
