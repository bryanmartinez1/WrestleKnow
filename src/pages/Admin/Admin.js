import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import Sidebar from "./Components/Sidebar";

export default function Admin() {
  const [wrestlerJSON, setWrestlerJSON] = useState(null);
  const [companyJSON, setCompanyJSON] = useState(null);
  const [titleJSON, setTitleJSON] = useState(null);
  const [factionJSON, setFactionJSON] = useState(null);
  const [brandJSON, setBrandJSON] = useState(null);
  const [ppvJSON, setPpvJSON] = useState(null);

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
      return true;
    } catch (error) {
      alert(`PPV Error! ${error.message}`);
      return false;
    }
  }

  useEffect(() => {
    if (wrestlerJSON === null) {
      wrestlerQuery();
    }
    if (companyJSON === null) {
      companyQuery();
    }
    if (titleJSON === null) {
      titleQuery();
    }
    if (factionJSON === null) {
      factionQuery();
    }
    if (brandJSON === null) {
      brandQuery();
    }
    if (ppvJSON === null) {
      ppvQuery();
    }
  });
  return (
    <div className="adminDisplay">
      <Sidebar />
    </div>
  );
}
