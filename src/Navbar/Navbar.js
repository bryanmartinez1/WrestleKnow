import "./navbar.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

import Button from "@atlaskit/button";
import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import Popup from "@atlaskit/popup";

import { DropdownItemGroup } from "@atlaskit/dropdown-menu";
import Dropdownitems from "./Components/Dropdownitems";

// Images for navbar
import boston_crab from "./Images/boston_crab.png";
import search_icon from "./Images/search_icon.png";
import controller_icon from "./Images/controller.png";
import compare_icon from "./Images/compare.png";
import profile_icon from "./Images/profile_icon.png";
import GraphBarIcon from "@atlaskit/icon/glyph/graph-bar";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  function navigateTo(link) {
    navigate(link);
  }

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    if (currentUser.get("admin")) {
      setAdmin(true);
    }
    return currentUser;
  };

  // Gets Current User
  useEffect(() => {
    getCurrentUser();
  }, [currentUser, setAdmin]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav">
      {windowWidth >= 900 ? (
        <Link to="/" className="site-name">
          WrestleKnow
          <img src={boston_crab} alt="Boston Crab" className="home-image" />
        </Link>
      ) : (
        <Link to="/" className="site-name">
          WK
          <img src={boston_crab} alt="Boston Crab" className="home-image" />
        </Link>
      )}
      <div className="navBarButtons">
        <Popup
          isOpen={isSearchDropdownOpen}
          onClose={() => setSearchDropdownOpen(false)}
          placement="bottom-end"
          content={() => (
            <DropdownItemGroup>
              <Dropdownitems link="wrestler" content="Wrestler" isLink />
              <Dropdownitems link="company" content="Company" isLink />
              <Dropdownitems link="title" content="Tile" isLink />
              <Dropdownitems link="faction" content="Faction" isLink />
              <Dropdownitems link="brand" content="Brand" isLink />
              <Dropdownitems link="ppv" content="PPV" isLink />
            </DropdownItemGroup>
          )}
          trigger={(triggerProps) => (
            <Tooltip
              component={TooltipPrimitive}
              content={<div className="tooltipContent">Search...</div>}
              hideTooltipOnMouseDown
            >
              <Button
                {...triggerProps}
                appearance="subtle"
                spacing="none"
                onClick={() => setSearchDropdownOpen(!isSearchDropdownOpen)}
              >
                <div className="margin">
                  <img className="navBarImage" src={search_icon} alt="SEARCH" />
                </div>
              </Button>
            </Tooltip>
          )}
        />
        <Tooltip
          component={TooltipPrimitive}
          content={<div className="tooltipContent">Charts</div>}
          hideTooltipOnMouseDown
        >
          <Button
            appearance="subtle"
            spacing="none"
            onClick={() => navigateTo("/charts")}
          >
            <GraphBarIcon size="xlarge" primaryColor="#000000" />
          </Button>
        </Tooltip>
        <Tooltip
          component={TooltipPrimitive}
          content={<div className="tooltipContent">Compare</div>}
          hideTooltipOnMouseDown
        >
          <Button
            appearance="subtle"
            spacing="none"
            onClick={() => navigateTo("/compare")}
          >
            <div className="margin">
              <img className="navBarImage" src={compare_icon} alt="COMPARE" />
            </div>
          </Button>
        </Tooltip>
        <Tooltip
          component={TooltipPrimitive}
          content={<div className="tooltipContent">Games</div>}
          hideTooltipOnMouseDown
        >
          <Button
            appearance="subtle"
            spacing="none"
            onClick={() => navigateTo("/games")}
          >
            <div className="margin">
              <img className="navBarImage" src={controller_icon} alt="Games" />
            </div>
          </Button>
        </Tooltip>
        <Popup
          isOpen={isProfileDropdownOpen}
          onClose={() => setProfileDropdownOpen(false)}
          placement="bottom-end"
          content={() => (
            <>
              {currentUser === null ? (
                <DropdownItemGroup>
                  <Dropdownitems link="login" content="Log In" isLink />
                  <Dropdownitems link="signup" content="Sign Up" isLink />
                </DropdownItemGroup>
              ) : (
                <DropdownItemGroup>
                  {isAdmin && (
                    <Dropdownitems link="admin" content="Admin" isLink />
                  )}
                  <Dropdownitems link="gp" content="Gorilla Position" isLink />
                  <Dropdownitems content="Log Out" setUser={setCurrentUser} />
                </DropdownItemGroup>
              )}
            </>
          )}
          trigger={(triggerProps) => (
            <Tooltip
              component={TooltipPrimitive}
              content={<div className="tooltipContent">Profile</div>}
              hideTooltipOnMouseDown
            >
              <Button
                {...triggerProps}
                appearance="subtle"
                spacing="none"
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="margin">
                  <img
                    className="navBarImage"
                    src={profile_icon}
                    alt="PROFILE"
                  />
                </div>
              </Button>
            </Tooltip>
          )}
        />
      </div>
    </nav>
  );
}
