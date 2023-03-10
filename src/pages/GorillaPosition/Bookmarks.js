import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function Bookmarks() {
  return (
    <div className="divider">
      <Leftbar />
      <div>Bookmarks</div>
      <Rightbar />
    </div>
  );
}
