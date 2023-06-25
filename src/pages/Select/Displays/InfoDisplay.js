import "./infoDisplay.css";
import React, { useEffect } from "react";

export default function InfoDisplay(props) {
  useEffect(() => {
    const infoDisplayBody = document.querySelector(".infoDisplayBody");
    infoDisplayBody.addEventListener("scroll", handleScroll);

    return () => {
      infoDisplayBody.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    const infoDisplayBody = document.querySelector(".infoDisplayBody");
    const scrollHeight = infoDisplayBody.scrollHeight;
    const clientHeight = infoDisplayBody.clientHeight;
    const scrollTop = infoDisplayBody.scrollTop;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }

  function renderListItems() {
    return props.text.map((item, index) => <li key={index}>{item}</li>);
  }

  return (
    <div className="infoDisplayHolder">
      <div className="infoDisplayTitle">{props.title}</div>
      {!props.isList && (
        <div class="progress-container">
          <div class="progress-bar" id="myBar"></div>
        </div>
      )}

      <div className="infoDisplayBody">
        {props.isList ? <ul>{renderListItems()}</ul> : <> {props.text}</>}
      </div>
    </div>
  );
}
