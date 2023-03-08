import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function Feed() {
  return (
    <div className="divider">
      <Leftbar />
      <div className="Feed">Feed</div>
      <Rightbar />
    </div>
  );
}
