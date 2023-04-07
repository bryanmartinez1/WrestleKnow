import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  // Navigates to Sign Up Page
  function navigateTo(link) {
    navigate(link);
  }
  return (
    <div className="sidebar">
      <div className="box" onClick={() => navigateTo("/admin")}>
        Admin
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createwrestler")}>
        Create Wrestler
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createcompany")}>
        Create Company
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createtitle")}>
        Create Title
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createfaction")}>
        Create Faction
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createbrand")}>
        Create Brand
      </div>
      <div className="box" onClick={() => navigateTo("/admin/createppv")}>
        Create PPV
      </div>
    </div>
  );
}
