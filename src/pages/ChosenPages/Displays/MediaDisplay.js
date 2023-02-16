import "./styles.css";
import twitterImg from "./images/twitter.png";
import instagramImg from "./images/instagram.png";

export default function MediaDisplay(props) {
  let instagramURL = "https://www.instagram.com/";
  let twitterURL = "https://www.twitter.com/";

  return (
    <div className="smallBox">
      <h1 className="boxHeader">Socials</h1>
      <a
        className="linkButton"
        href={twitterURL + props.twitter}
        target="_blank"
      >
        <img className="linkImg" src={twitterImg}></img> @{props.twitter}
      </a>
      <a
        className="linkButton"
        href={instagramURL + props.instagram}
        target="_blank"
      >
        <img className="linkImg" src={instagramImg}></img>@{props.instagram}
      </a>
    </div>
  );
}
