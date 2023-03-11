import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function Follow() {
  return (
    <div className="divider">
      <Leftbar />

      <div className="middle">Following | Followers</div>
      <Rightbar />
    </div>
  );
}
