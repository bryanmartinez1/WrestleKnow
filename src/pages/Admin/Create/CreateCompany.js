import React from "react";
import Loading from "../Components/Loading";
import Sidebar from "../Components/Sidebar";
import ActivityDrop from "../Components/ActivityDrop";
import SocialMediaLinks from "../Components/SocialMediaLinks";
import "./create.css";

export default function CreateCompany() {
  return (
    <div className="createHolder">
      <Sidebar />
      <div className="holderPage"> Company </div>
    </div>
  );
}
