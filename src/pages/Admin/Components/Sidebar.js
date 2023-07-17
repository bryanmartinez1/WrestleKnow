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
      <div className="box" onClick={() => navigateTo("/admin/create/wrestler")}>
        Create Wrestler
      </div>
      <div className="box" onClick={() => navigateTo("/admin/create/company")}>
        Create Company
      </div>
      <div className="box" onClick={() => navigateTo("/admin/create/title")}>
        Create Title
      </div>
      <div className="box" onClick={() => navigateTo("/admin/create/faction")}>
        Create Faction
      </div>
      <div className="box" onClick={() => navigateTo("/admin/create/brand")}>
        Create Brand
      </div>
      <div className="box" onClick={() => navigateTo("/admin/create/ppv")}>
        Create PPV
      </div>
    </div>
  );
}
