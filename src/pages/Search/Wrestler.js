import React, { useEffect, useState } from "react";
import "./Displays/styles/wrestler.css";
import Parse from "parse/dist/parse.min.js";
import WrestlerDisplay from "./Displays/WrestlerDisplay";
import search_icon from "./Images/search_icon.png";

export default function Wrestler() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [query, setQuery] = useState();
  const [show, setShow] = useState(false);

  // When User hits enter in searchbar,search hook is updated
  // and query is also updated
  async function newSearch(event) {
    if (event.key === "Enter") {
      console.log(
        "User Searched: " + document.getElementById("searchInput").value
      );
      setSearch(document.getElementById("searchInput").value.toLowerCase());
      closeDrop();
    }
  }

  useEffect(() => {
    console.log("Searched " + search);
    console.log("Sort " + sort);
    startQuery(search, sort);
  }, [search, sort]);

  // When User changes sort dropdown
  // and query will be updated
  async function changeSort(value) {
    switch (value) {
      case 0:
        setSort("Recommended");
        break;
      case 1:
        setSort("A - Z");
        break;
      case 2:
        setSort("Z - A");
        break;
      case 3:
        setSort("Youngest");
        break;
      case 4:
        setSort("Oldest");
        break;
    }
    closeDrop();
    startQuery(search, sort);
  }

  // Dropdown Functions
  // Proper Implemnation to be Added
  // Functions to Open and Close Dropdown
  var dropOpened = false;
  //Function to Open Dropdown
  function openDrop() {
    document.getElementById("wrestlerdrop").style.display = "block";
    dropOpened = true;
  }
  //Function to Close Dropdown
  function closeDrop() {
    document.getElementById("wrestlerdrop").style.display = "none";
    dropOpened = false;
  }
  //puts the two together
  function dropOpenClose() {
    if (dropOpened === false) {
      openDrop();
    } else {
      closeDrop();
    }
  }

  // Query is Started
  async function startQuery(searchVal, sortVal) {
    let wrestlerQuery = new Parse.Query("Wrestler");
    let nameQuery = new Parse.Query("Wrestler");
    let akaQuery = new Parse.Query("Wrestler");
    let aboutQuery = new Parse.Query("Wrestler");
    let fromQuery = new Parse.Query("Wrestler");

    try {
      nameQuery.contains("lower_name", searchVal);
      akaQuery.contains("lower_aka", searchVal);
      aboutQuery.contains("lower_about", searchVal);
      fromQuery.contains("lower_from", searchVal);
      wrestlerQuery._orQuery([nameQuery, akaQuery, aboutQuery, fromQuery]);
      //Sorts Query
      if (sortVal === "A - Z") {
        wrestlerQuery.addAscending("name");
      } else if (sortVal === "Z - A") {
        wrestlerQuery.addDescending("name");
      } else if (sortVal === "Youngest") {
        wrestlerQuery.addDescending("birth");
      } else if (sortVal === "Oldest") {
        wrestlerQuery.addAscending("birth");
      }
      let wrestlerResults = await wrestlerQuery.find();
      console.log(wrestlerResults);
      setQuery(wrestlerResults);
      setShow(true);
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }

  function showResults() {
    return query.map((wrestler) => {
      return (
        <div>
          <WrestlerDisplay
            showing={0}
            link={"/wrestler/chosenwrestler"}
            name={wrestler.get("name")}
            infoFROM={wrestler.get("from")}
            infoB={JSON.stringify(wrestler.get("company"))}
            infoDATE={wrestler.get("birth")}
            imgSrc={wrestler.get("image")}
            innerQuery={"Company"}
            objectId={wrestler.id}
          ></WrestlerDisplay>
        </div>
      );
    });
  }

  const [data, setData] = useState("");

  return (
    <div className="wrestler-body">
      <div className="searchbar">
        <div className="bar">
          <img className="searchIcon" src={search_icon}></img>
          <input
            className="searchInput"
            onKeyDown={(key) => newSearch(key)}
            id="searchInput"
          ></input>
        </div>
        <div className="sort-holder">
          {/* Dropdown will be updated to that similar of the dropdwon if the navbar */}
          <div className="dropdown">
            {" "}
            Sort By:
            <button
              className="dropdown-wrestler-sort-button"
              onClick={() => dropOpenClose()}
            >
              {sort}
            </button>
            <div class="content-box" id="wrestlerdrop">
              <div className="option" onClick={() => changeSort(0)}>
                Recommended
              </div>
              <div className="option" onClick={() => changeSort(1)}>
                A - Z
              </div>
              <div className="option" onClick={() => changeSort(2)}>
                Z - A
              </div>
              <div className="option" onClick={() => changeSort(3)}>
                Youngest
              </div>
              <div className="option" onClick={() => changeSort(4)}>
                Oldest
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="wrestlerHolder">{showResults()}</div>}
    </div>
  );
}
