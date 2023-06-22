import "./socialMedia.css";

export default function SocialMedia(props) {
  return (
    <div className="socialMediaHolder">
      <div className="soicalMediaTitle">{props.title}</div>
      <div className="socialMediaBody"> {props.text}</div>
      {props.twitter != "" && <div>{props.twitter}</div>}
      {props.instagram != "" && <div>{props.instagram}</div>}
      {props.tiktok != "" && <div>{props.tiktok}</div>}
      {props.youtubeAt != "" && <div>{props.youtubeAt}</div>}
    </div>
  );
}
