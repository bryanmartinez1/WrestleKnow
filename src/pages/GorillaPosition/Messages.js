import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
//Messages Will have different Rightbar named Messagesbar
import "./styles/gp.css";

export default function Messages() {
  return (
    <div className="divider">
      <Leftbar />
      <div className="middle">
        <Topbar name="Messages" />
      </div>
      <Rightbar />
    </div>
  );
}
