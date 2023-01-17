import "./styles/navbar.css";
import { Link } from "react-router-dom";
import boston_crab from "./images/boston_crab.png";
import wrestler from "./images/mask_icon.png";
import title from "./images/title_icon.png";
import company from "./images/company_icon.png";
import faction from "./images/faction_icon.png";
import profile from "./images/profile_icon.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-name">
        WrestleKnow
        <img src={boston_crab} className="home-image"></img>
      </Link>
      <ul>
        {" "}
        <li>
          <Link to="/wrestler">
            <img src={wrestler} className="home-image"></img>
            Wrestlers
          </Link>
        </li>
        <li>
          <Link to="/title">
            <img src={title} className="home-image"></img>
            Titles
          </Link>
        </li>
        <li>
          <Link to="/company">
            <img src={company} className="home-image"></img>
            Companies
          </Link>
        </li>
        <li>
          <Link to="/faction">
            <img src={faction} className="home-image"></img>
            Factions
          </Link>
        </li>
        <li>
          <img src={profile} className="home-image"></img>
        </li>
      </ul>
    </nav>
  );
}
