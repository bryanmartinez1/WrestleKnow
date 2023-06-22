import "./infoDisplay.css";

export default function InfoDisplay(props) {
  return (
    <div className="infoDisplayHolder">
      <div className="infoDisplayTitle">{props.title}</div>
      <div className="infoDisplayBody"> {props.text}</div>
    </div>
  );
}
