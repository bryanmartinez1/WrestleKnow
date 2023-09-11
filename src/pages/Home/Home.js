import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import "./home.css";
import Carousel from "./Components/Carousel";
import VideoPlayer from "./Components/VideoPlayer.js";
import FLAGS from "../../FLAGS";

export default function Home() {
  let youtube = "https://www.youtube.com/embed/";
  let vidID = "b8C5JzzkIU8";
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);
  const [showWrestlerCarousel, setShowWrestlerCarousel] = useState(false);
  const [showCompanyCarousel, setShowCompanyCarousel] = useState(false);
  const [showTitleCarousel, setShowTitleCarousel] = useState(false);
  const [showFactionCarousel, setShowFactionCarousel] = useState(false);
  const [showBrandCarousel, setShowBrandCarousel] = useState(false);
  const [showPpvCarousel, setShowPpvCarousel] = useState(false);
  const [wrestlerJSON, setWrestlerJSON] = useState();
  const [companyJSON, setCompanyJSON] = useState();
  const [titleJSON, setTitleJSON] = useState();
  const [factionJSON, setFactionJSON] = useState();
  const [brandJSON, setBrandJSON] = useState();
  const [ppvJSON, setPpvJSON] = useState();

  async function wrestlerQuery() {
    try {
      let doParse = new Parse.Query("Wrestler");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 5; i++) {
        queryJSON.name.push(results[i].get("name"));
        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );
        queryJSON.id.push(results[i].id);
      }
      setWrestlerJSON(queryJSON);
      setShowWrestlerCarousel(true);
      return true;
    } catch (error) {
      alert(`Wrestler Error! ${error.message}`);
      return false;
    }
  }

  async function companyQuery() {
    try {
      let doParse = new Parse.Query("Company");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 5; i++) {
        queryJSON.name.push(results[i].get("shortName"));
        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );
        queryJSON.id.push(results[i].id);
      }
      setCompanyJSON(queryJSON);
      setShowCompanyCarousel(true);
      return true;
    } catch (error) {
      alert(`Company Error! ${error.message} `);
      return false;
    }
  }

  async function titleQuery() {
    try {
      let doParse = new Parse.Query("Title");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 5; i++) {
        queryJSON.name.push(results[i].get("name"));
        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );
        queryJSON.id.push(results[i].id);
      }
      setTitleJSON(queryJSON);
      setShowTitleCarousel(true);
      return true;
    } catch (error) {
      alert(`Title Error! ${error.message} `);
      return false;
    }
  }

  async function factionQuery() {
    try {
      let doParse = new Parse.Query("Faction");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 1; i++) {
        queryJSON.name.push(results[i].get("name"));

        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );
        queryJSON.id.push(results[i].id);
      }
      setFactionJSON(queryJSON);
      setShowFactionCarousel(true);
      return true;
    } catch (error) {
      alert(`Faction Error! ${error.message}`);
      return false;
    }
  }

  async function brandQuery() {
    try {
      let doParse = new Parse.Query("Brand");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 2; i++) {
        queryJSON.name.push(results[i].get("name"));

        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );

        queryJSON.id.push(results[i].id);
      }
      setBrandJSON(queryJSON);
      setShowBrandCarousel(true);
      return true;
    } catch (error) {
      alert(`Brand Error! ${error.message} `);
      return false;
    }
  }

  async function ppvQuery() {
    try {
      let doParse = new Parse.Query("PPV");
      const results = await doParse.find();
      let queryJSON = {
        name: [],
        image: [],
        id: [],
      };
      for (let i = 0; i < 1; i++) {
        queryJSON.name.push(results[i].get("name"));

        queryJSON.image.push(
          JSON.stringify(results[i].get("image"))
            .split('url":"')
            .pop()
            .slice(0, -2)
        );

        queryJSON.id.push(results[i].id);
      }
      setPpvJSON(queryJSON);
      setShowPpvCarousel(true);
      return true;
    } catch (error) {
      alert(`PPV Error! ${error.message}`);
      return false;
    }
  }

  useEffect(() => {
    if (!showWrestlerCarousel) {
      wrestlerQuery();
    }
    if (!showCompanyCarousel) {
      companyQuery();
    }
    if (!showTitleCarousel) {
      titleQuery();
    }
    if (!showFactionCarousel) {
      factionQuery();
    }
    if (!showBrandCarousel) {
      brandQuery();
    }
    if (!showPpvCarousel) {
      ppvQuery();
    }
  });

  return (
    <div className="homePage">
      <VideoPlayer vidID={vidID} />
      <div className="carouselDiv">
        {showWrestlerCarousel ? (
          <Carousel resultsJSON={wrestlerJSON} link="/wrestler/" />
        ) : null}
        {showCompanyCarousel ? (
          <Carousel resultsJSON={companyJSON} link="/company/" />
        ) : null}
        {showTitleCarousel ? (
          <Carousel resultsJSON={titleJSON} link="/title/" />
        ) : null}
        {showFactionCarousel ? (
          <Carousel resultsJSON={factionJSON} link="/faction/" />
        ) : null}
        {showBrandCarousel ? (
          <Carousel resultsJSON={brandJSON} link="/brand/" />
        ) : null}
        {showPpvCarousel ? (
          <Carousel resultsJSON={ppvJSON} link="/ppv/" />
        ) : null}
      </div>
    </div>
  );
}
