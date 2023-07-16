import React from "react";
import "./home.css";

export default function Home() {
  let youtube = "https://www.youtube.com/embed/";
  let vidID = "b8C5JzzkIU8";
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);

  return (
    <div className="page">
      <h1>On This Day: {dateString} </h1>
      <p>Andrade wins the NXT Championship </p>
      <iframe className="ytVid" src={youtube + vidID} title="On This Day" />
    </div>
  );
}
