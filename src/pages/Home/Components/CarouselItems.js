import React from "react";
import "./carouselItems.css";
import { useNavigate } from "react-router-dom";

export default function CarouselItems(props) {
  const navigate = useNavigate();

  function navigateTo(link) {
    navigate(link);
  }

  return (
    <div className="itemsHolder">
      <img
        src={props.image}
        className="carosuelItemImage"
        onClick={() => navigateTo(`${props.link}${props.id}`)}
      />
    </div>
  );
}
