import "./styles.css";

export default function InfoDisplay(props) {
  return (
    <div className="smallBox">
      <h1 className="boxHeader">{props.title}</h1>
      {props.text}
    </div>
  );
}
