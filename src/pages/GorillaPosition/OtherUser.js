import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function OtherUser() {
  return (
    <div className="divider">
      <Leftbar />
      <div>Other User</div>
      <Rightbar />
    </div>
  );
}
