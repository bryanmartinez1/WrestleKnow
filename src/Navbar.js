import "./styles/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-name">
        WrestleKnow
      </Link>
      <ul>
        {" "}
        <li>
          <Link to="/wrestler">Wrestler</Link>
        </li>
        <li>
          <Link to="/title">Title</Link>
        </li>
        <li>
          <Link to="/company">Company</Link>
        </li>
        <li>
          <Link to="/faction">Faction</Link>
        </li>
      </ul>
    </nav>
  );
}
