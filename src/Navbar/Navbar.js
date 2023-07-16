import "./navbar.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

import Button from "@atlaskit/button";

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";

// Images for navbar
import boston_crab from "./Images/boston_crab.png";
import search_icon from "./Images/search_icon.png";
import profile_icon from "./Images/profile_icon.png";
import GraphBarIcon from "@atlaskit/icon/glyph/graph-bar";

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
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

  const logOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        console.log("Log Out: No user is logged in anymore!");
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  // Gets Current User
  useEffect(() => {
    getCurrentUser();
  }, [currentUser, setAdmin]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
      {windowWidth >= 700 ? (
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
        <div id="transaction_id_1" className="span.css-7no60z-ButtonBase">
          <DropdownMenu
            appearance="default"
            trigger={({ triggerRef, ...props }) => (
              <Button
                appearance="subtle"
                spacing="default"
                {...props}
                iconBefore={
                  <div className="padding">
                    <img
                      className="navBarImage"
                      src={search_icon}
                      alt="SEARCH"
                    />
                  </div>
                }
                ref={triggerRef}
              />
            )}
          >
            <DropdownItemGroup>
              <DropdownItem
                onClick={() => navigateTo("/wrestler")}
                className="custom"
              >
                Wrestlers
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/company")}>
                Companies
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/title")}>
                Titles
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/faction")}>
                Factions
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/brand")}>
                Brands
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/ppv")}>
                PPVs
              </DropdownItem>
            </DropdownItemGroup>
          </DropdownMenu>
        </div>
        <Button
          appearance="subtle"
          spacing="none"
          onClick={() => navigateTo("/compare")}
        >
          <GraphBarIcon size="xlarge" primaryColor="#000000" />
        </Button>
        <DropdownMenu
          appearance="default"
          trigger={({ triggerRef, ...props }) => (
            <Button
              {...props}
              appearance="subtle"
              spacing="none"
              iconBefore={
                <img className="navBarImage" src={profile_icon} alt="PROFILE" />
              }
              ref={triggerRef}
            />
          )}
        >
          {currentUser === null ? (
            <DropdownItemGroup>
              <DropdownItem onClick={() => navigateTo("/login")}>
                Log In
              </DropdownItem>
              <DropdownItem onClick={() => navigateTo("/signup")}>
                Sign Up
              </DropdownItem>
            </DropdownItemGroup>
          ) : (
            <DropdownItemGroup>
              {isAdmin && (
                <DropdownItem onClick={() => navigateTo("/admin")}>
                  Admin
                </DropdownItem>
              )}
              <DropdownItem onClick={() => navigateTo("/gp")}>
                Gorilla Position
              </DropdownItem>
              <DropdownItem onClick={() => logOut()}>Log Out</DropdownItem>
            </DropdownItemGroup>
          )}
        </DropdownMenu>
      </div>
    </nav>
  );
}
