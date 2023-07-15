/*
Home Page that will display
    - On this Day Panel
    - Show the 3 Hottest Posts of the Last 7 Days
    - The 2 most Popular Posts of All Time
    - 5 recommended wrestlers, companies, titles, and factions
        - Will be recommened on based on each categories most popular/checked on figures of the last 30 days
    - Smaller News Panel displaying the biggest News of wrestling of the month
*/
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
      <iframe className="ytVid" src={youtube + vidID} />
    </div>
  );
}
