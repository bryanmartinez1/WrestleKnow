import React, { useState, useEffect } from "react";
import CarouselItems from "./CarouselItems";
import "./carousel.css";
import next from "../../../images/next arrow.png";
import previous from "../../../images/previous arrow.png";

export default function Carousel(props) {
  const [page, changePage] = useState(0);

  useEffect(() => {}, [page]);

  function MovingLeft() {
    if (page - 1 === -1) {
      changePage(4);
    } else {
      changePage(page - 1);
    }
  }
  function MovingRight() {
    if (page + 1 === 5) {
      changePage(0);
    } else {
      changePage(page + 1);
    }
  }

  return (
    <div className="carouselHolder">
      <CarouselItems
        image={props.resultsJSON.image[page]}
        id={props.resultsJSON.id[page]}
        link={props.link}
      />
      <div className="arrowHolder">
        <button onClick={() => MovingLeft()} className="arrowButton">
          <img src={previous} className="arrowImg" alt="Previous" />
        </button>
        <>{page + 1} of 5</>
        <button onClick={() => MovingRight()} className="arrowButton">
          <img src={next} className="arrowImg" alt="Next" />
        </button>
      </div>
    </div>
  );
}
