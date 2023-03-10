import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function Profile() {
  return (
    <div className="divider">
      <Leftbar />
      <div>Profile</div>
      <Rightbar />
    </div>
  );
}
