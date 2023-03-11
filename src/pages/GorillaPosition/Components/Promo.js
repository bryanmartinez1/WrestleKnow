import "./styles/promos.css";
import pfp from "./images/profile_icon.png";
import cheer from "./images/cheers.png";
import boo from "./images/boo.png";
import comment from "./images/comments.png";
import bookmark from "./images/bookmark.png";
import reply from "./images/reply.png";

export default function Promo() {
  // Take In Props later

  function Cheer() {
    alert("Cheer");
  }
  function Boo() {
    alert("Boo");
  }
  function Reply() {
    alert("Create Reply");
  }
  function Comments() {
    alert("View Comments");
  }
  function Bookmark() {
    alert("Bookmarking this promo");
  }
  return (
    <div className="whole">
      <img className="promoImg" src={pfp}></img>
      <div className="content">
        <div className="topBar">
          <div className="userName"> UserNameUserNameUserName</div>
          <div className="datePosted">SEPTEMBER 31, 2023 12:59 PM</div>
        </div>
        <div className="promo">
          This is just to show the max amount for characters allowed. User can
          have a post with up to a max of 256 characters. This post has 256
          characters. The false date posted is September 31, 2023 at 12:59 PM.
          206 210 214 218 222 226 230 234 238 242 246 250 254.
        </div>
        <div className="bottomBar">
          <button onClick={() => Cheer()}>
            <img className="imgButton" src={cheer}></img>
          </button>
          <button onClick={() => Boo()}>
            <img className="imgButton" src={boo}></img>
          </button>
          <button onClick={() => Reply()}>
            <img className="imgButton" src={reply}></img>
          </button>
          <button onClick={() => Comments()}>
            <img className="imgButton" src={comment}></img>
          </button>
          <button onClick={() => Bookmark()}>
            <img className="imgButton" src={bookmark}></img>
          </button>
        </div>
      </div>
    </div>
  );
}
