import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";

export default function OtherUser() {
  return (
    <div className="divider">
      <Leftbar />
      <div className="middle">
        <Topbar name="Gorilla Position" />
      </div>
      <Rightbar />
    </div>
  );
}
