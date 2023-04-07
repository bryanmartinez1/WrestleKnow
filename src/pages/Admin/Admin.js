import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";

export default function Admin() {
  return (
    <div className="adminDisplay">
      <Sidebar />
    </div>
  );
}
