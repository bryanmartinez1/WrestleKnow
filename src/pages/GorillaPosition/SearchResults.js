import Leftbar from "./Components/Leftbar";
import Rightbar from "./Components/Rightbar";
import "./styles/gp.css";

export default function SearchResults() {
  return (
    <div className="divider">
      <Leftbar />
      <div>Results of search</div>
      <Rightbar />
    </div>
  );
}
