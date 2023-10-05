import React, { useEffect, useState } from "react";
import "./styles/search.css";
import Parse from "parse/dist/parse.min.js";
import ObjectCard from "./ObjectCard";
import search_icon from "./Images/search_icon.png";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [query, setQuery] = useState();
  const [show, setShow] = useState(false);
  const [testingJSON, setJSON] = useState();

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
    startQuery(search, sort);
  }, [search, sort]);

  // When User changes sort dropdown
  // and query will be updated
  async function changeSort(value) {
    switch (value) {
      default:
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
  }

  // Dropdown Functions
  // Proper Implemnation to be Added
  // Functions to Open and Close Dropdown
  let dropOpened = false;
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
    const data = new Parse.Query(props.queryClass);

    data.contains("lower_name", searchVal);

    if (sortVal === "A - Z") {
      data.ascending("lower_name");
    } else if (sortVal === "Z - A") {
      data.descending("lower_name");
    } else if (sortVal === "Youngest") {
      data.descending("date");
    } else if (sortVal === "Oldest") {
      data.ascending("date");
    }

    try {
      let wrestlerResults = await data.find();
      setJSON(JSON.stringify(wrestlerResults[19]));
      setQuery(wrestlerResults);
      setShow(true);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }

  function showResults() {
    return query.map((object) => {
      return (
        <ObjectCard
          name={object.get("name")}
          imageSRC={object.get("image")}
          infoA={object.get(props.infoA)}
          date={object.get("date")}
          hasEndDate={object.get("active") === "Defunct"}
          endDate={object.get("end_date")}
          active={object.get("active")}
          link={props.chosenLink}
          objectID={object.id}
          queryClass={props.queryClass}
        />
      );
    });
  }

  return (
    <div className="wrestler-body">
      <div className="searchbar">
        <div className="bar">
          <img className="searchIcon" src={search_icon} alt="Search"></img>
          <input
            className="searchInput"
            onKeyDown={(key) => newSearch(key)}
            id="searchInput"
          ></input>
        </div>
        <div className="sort-holder">
          <div className="dropdown">
            Sort By:
            <button
              className="dropdown-wrestler-sort-button"
              onClick={() => dropOpenClose()}
            >
              {sort}
            </button>
            {(props.queryClass === "Wrestler" ||
              props.queryClass === "Company" ||
              props.queryClass === "Title") && (
              <div className="content-box" id="wrestlerdrop">
                <div className="option" onClick={() => changeSort()}>
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
            )}
            {props.queryClass === "Faction" && (
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
              </div>
            )}
          </div>
        </div>
      </div>
      {show && (
        <div className="centerHolder">
          <div className="wrestlerHolder">{showResults()}</div>
        </div>
      )}
      {testingJSON}
    </div>
  );
}
