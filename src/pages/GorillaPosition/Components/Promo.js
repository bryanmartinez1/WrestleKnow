import "./styles/promos.css";
import pfp from "./images/profile_icon.png";
import cheer from "./images/cheer.png";
import boo from "./images/boo.png";
import comment from "./images/comments.png";
import bookmark from "./images/bookmark.png";

export default function Promo() {
  function Cheer() {
    alert("CHEER");
  }
  function Boo() {
    alert("BOO");
  }
  function Comment() {
    alert("COMMENT");
  }
  function Save() {
    alert("SAVE");
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
          Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh
          Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh
          Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh
          Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruh Bruhs
        </div>
        <div className="bottomBar">
          <button onClick={() => Cheer()}>
            <img className="imgButton" src={cheer}></img>
          </button>
          <button onClick={() => Boo()}>
            <img className="imgButton" src={boo}></img>
          </button>
          <button onClick={() => Comment()}>
            <img className="imgButton" src={comment}></img>
          </button>
          <button onClick={() => Save()}>
            <img className="imgButton" src={bookmark}></img>
          </button>
        </div>
      </div>
    </div>
  );
}
