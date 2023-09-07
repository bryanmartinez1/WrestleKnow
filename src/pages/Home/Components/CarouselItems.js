import React from "react";
import "./carouselItems.css";

export default function CarouselItems(props) {
  return (
    <div className="itemsHolder">
      <img src={props.image} className="carosuelItemImage" />
    </div>
  );
}
