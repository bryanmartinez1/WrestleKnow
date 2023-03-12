import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";

export default function SearchResults() {
  return (
    <div className="divider">
      <Leftbar />
      <div className="middle">
        <Topbar name="Results" />
      </div>
      <Rightbar />
    </div>
  );
}
