import "./socialMedia.css";

export default function SocialMedia(props) {
  return (
    <div className="socialMediaHolder">
      <div className="soicalMediaTitle">{props.title}</div>
      <div className="socialMediaBody"> {props.text}</div>
      {props.twitter !== "" && <>{props.twitter}</>}
      {props.instagram !== "" && <>{props.instagram}</>}
      {props.tiktok !== "" && <>{props.tiktok}</>}
      {props.youtubeAt !== "" && <>{props.youtubeAt}</>}
    </div>
  );
}
