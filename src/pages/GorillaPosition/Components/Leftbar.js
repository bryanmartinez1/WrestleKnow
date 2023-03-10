import { Link, useNavigate } from "react-router-dom";
import "./styles/leftbar.css";
import pfp from "./profile_icon.png";

export default function Leftbar(props) {
  const navigate = useNavigate();
  function to_GP_Profile() {
    navigate("/gp/profile");
  }

  // Get Current User Function
  return (
    <div className="leftside">
      <img className="pfp" src={pfp} onClick={() => to_GP_Profile()} />
      <div className="names" onClick={() => to_GP_Profile()}>
        Bryan Last Name
      </div>
      <div className="names" onClick={() => to_GP_Profile()}>
        {" "}
        am{" "}
      </div>
      <Link className="link">10 Promos</Link>
      <Link className="link">10 Followers 400 Following</Link>
      <div className="bio">Random stuff, idk man</div>
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
      <Link className="link" to="/gp/follow">
        Follow
      </Link>
    </div>
  );
}
