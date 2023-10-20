import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";
import Parse from "parse/dist/parse.min.js";
import QuickInfo from "./Displays/QuickInfo.js";

const CompanySelect = () => {
  const { companyId } = useParams(); // Accessing the route parameter
  const [companyInfo, setCompanyInfo] = useState();
  const [showCompany, setShowCompany] = useState(false);

  useEffect(() => {
    if (!showCompany) {
      getCompanyInfo();
    }
  }, [showCompany]);

  const getCompanyInfo = async () => {
    const companyQuery = new Parse.Query("Company");
    companyQuery.equalTo("objectId", companyId);
    try {
      const companyResults = await companyQuery.find();
      const start_date = companyResults[0].get("date");
      const companyInfoJSON = {
        name: companyResults[0].get("name"),
        shortName: companyResults[0].get("shortName"),
        image: JSON.stringify(companyResults[0].get("image"))
          .split('url":"')
          .pop()
          .slice(0, -2),
        active: companyResults[0].get("active"),
        aka: companyResults[0].get("aka"),
        start_date: start_date
          .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
          .toString(),
        end_date: companyResults[0].get("end_date"),
        instagram: companyResults[0].get("instagram_at"),
        youtube: companyResults[0].get("youtube_at"),
        tiktok: companyResults[0].get("tiktok_at"),
        threads: companyResults[0].get("threads_at"),
        twitter: companyResults[0].get("twitter_at"),
        video: companyResults[0].get("youtube_vid"),
      };
      let age;
      if (companyInfoJSON.end_date) {
        let companyAge = companyInfoJSON.end_date - start_date;
        let ageDate = new Date(companyAge);
        age = ageDate.getUTCFullYear() - 1970;
      } else {
        age = getAge(start_date);
      }
      companyInfoJSON.age = `${age} Years Old`;
      setCompanyInfo(companyInfoJSON);
      setShowCompany(true);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <>
      {showCompany && (
        <div className="selectHolder">
          <div className="wrestlerNameDiv">{companyInfo.name}</div>
          <QuickInfo
            imgSrc={companyInfo.image}
            companyName={companyInfo.name}
            companyID={companyId}
            topLeft={companyInfo.shortName}
            topRight={companyInfo.active}
            bottomLeft={companyInfo.start_date}
            bottomRight={companyInfo.age}
          />
        </div>
      )}
    </>
  );
};

export default CompanySelect;
