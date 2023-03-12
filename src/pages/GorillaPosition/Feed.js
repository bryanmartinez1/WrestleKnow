import Leftbar from "./Components/Leftbar";
import Promo from "./Components/Promo";
import Rightbar from "./Components/Rightbar";
import Topbar from "./Components/Topbar";
import "./styles/gp.css";

export default function Feed() {
  return (
    <div className="divider">
      <Leftbar />
      <div className="middle">
        <Topbar name="Gorilla Position" />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
        <Promo />
      </div>
      <Rightbar />
    </div>
  );
}
