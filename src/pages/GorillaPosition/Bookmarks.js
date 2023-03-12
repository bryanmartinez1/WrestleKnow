import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";

export default function Bookmarks() {
  // add get current user function
  return (
    <div className="divider">
      <Leftbar />
      <div className="middle">
        <Topbar name="Bookmarks" />
      </div>
      <Rightbar />
    </div>
  );
}
