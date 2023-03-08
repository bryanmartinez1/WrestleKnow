import { Link } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./profile_icon.png";

export default function Leftbar(props) {
  // Get Current User Function
  return (
    <div className="leftside">
      <img className="pfp" src={pfp} />
      <div className="names">Registered Name</div>
      <div className="names"> User Name</div>
      <Link className="link">Posts</Link>
      <Link className="link">Followers Following</Link>
      <div className="bio">
        blah blah blah blah blah blah blah blah blah blah blah blah blah blah
        blah blah blah blah blah blah blah blah blah blah blah blah blah blah
        blah blah blah blah blah blah blah blah blah blah blah blah blah blah
        blah blah blah blah blah blah blah blah blah b
      </div>
      <Link className="link" to="/gp">
        Feed
      </Link>
      <Link className="link" to="/gp/bookmarks">
        View Bookmarks
      </Link>
      <Link className="link" to="/gp/messages">
        View Messages
      </Link>
      <Link className="link" to="/gp/otheruser">
        View User
      </Link>
      <Link className="link" to="/gp/searchresults">
        Search
      </Link>
      <Link className="link" to="/gp/profile">
        Profile
      </Link>
    </div>
  );
}
