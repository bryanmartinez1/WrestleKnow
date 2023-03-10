import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
//Messages Will have different Rightbar named Messagesbar
import "./styles/gp.css";

export default function Messages() {
  return (
    <div className="divider">
      <Leftbar />
      <div>Messages</div>
      <Rightbar />
    </div>
  );
}
