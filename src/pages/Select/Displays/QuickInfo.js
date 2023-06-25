import "./quickInfo.css";
import { Link } from "react-router-dom";

export default function QuickInfo(props) {
  return (
    <div className="quickInfoHolder">
      <img className="quickInfoIMG" src={props.imgSrc} />
      <Link
        className="holderBox"
        to={"/company/chosencompany"}
        state={{ id: props.companyID }}
      >
        {props.companyName}
      </Link>
      <div class="horizontal-border" />
      <div className="holderBox">
        <div className="quickInfoContent">{props.topLeft}</div>
        <div className="quickInfoContent">{props.topRight}</div>
      </div>
      <div class="horizontal-border" />
      <div className="holderBox">
        <div className="quickInfoContent">{props.bottomLeft}</div>
        <div className="quickInfoContent">{props.bottomRight}</div>
      </div>
    </div>
  );
}
