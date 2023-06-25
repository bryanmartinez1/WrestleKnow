import "./infoDisplay.css";
import { Link } from "react-router-dom";

export default function CompanyDisplay(props) {
  return (
    <div className="infoDisplayHolder">
      <div className="infoDisplayTitle">Company</div>
      <Link
        className="companyDisplayBody"
        to={"/company/chosencompany"}
        state={{ id: props.companyID }}
      >
        <img className="companyImage" src={props.companyImage} />
        <>{props.companyName}</>
      </Link>
    </div>
  );
}
