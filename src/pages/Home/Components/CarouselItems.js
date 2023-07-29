import React from "react";
import "./carouselItems.css";

export default function CarouselItems(props) {
  return (
    <div className="itemsHolder">
      <div className="carosuelItemName">{props.name}</div>
      <img src={props.image} className="carosuelItemImage" />
      <>{props.page + 1} of 5</>
    </div>
  );
}
