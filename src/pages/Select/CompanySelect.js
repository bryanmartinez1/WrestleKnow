import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAge } from "../../Functions/functions.js";
import Parse from "parse/dist/parse.min.js";
import QuickInfo from "./Displays/QuickInfo.js";
import InfoDisplay from "./Displays/InfoDisplays.js";
import SocialMedia from "./Displays/SocialMedia.js";

const CompanySelect = () => {
  const { companyId } = useParams(); // Accessing the route parameter
  const [companyInfo, setCompanyInfo] = useState();
  const [showCompany, setShowCompany] = useState(false);

  function createBulletPointList(text) {
    return text.split(",");
  }

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
        about: companyResults[0].get("about"),
        aka: createBulletPointList(companyResults[0].get("aka")),
        start_date: start_date
          .toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
          .toString(),
        end_date: companyResults[0].get("end_date"),
        instagram: companyResults[0].get("instagram_at"),
        youtuber: companyResults[0].get("youtube_at"),
        tiktok: companyResults[0].get("tiktok_at"),
        threads: companyResults[0].get("threads_at"),
        twitter: companyResults[0].get("twitter_at"),
        video:
          "https://www.youtube.com/embed/" +
          companyResults[0].get("youtube_vid"),
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
          <div className="otherInfo">
            <div className="leftSide">
              <div className="leftSideTop">
                <QuickInfo
                  imgSrc={companyInfo.image}
                  companyName={companyInfo.name}
                  companyID={companyId}
                  topLeft={companyInfo.shortName}
                  topRight={companyInfo.active}
                  bottomLeft={companyInfo.start_date}
                  bottomRight={companyInfo.age}
                />
                <InfoDisplay
                  title="About"
                  text={companyInfo.about}
                  isList={false}
                />
              </div>
              <iframe
                className="ytVidChoosen"
                src={companyInfo.video}
                title="Company Page"
              />
            </div>
            <div className="leftSide">
              <div className="leftSideTop">
                <InfoDisplay title="AKA" text={companyInfo.aka} isList={true} />
                <SocialMedia
                  title="Social Media"
                  twitter={companyInfo.twitter}
                  instagram={companyInfo.instagram}
                  tiktok={companyInfo.tiktok}
                  youtuber={companyInfo.youtuber}
                  threads={companyInfo.threads}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanySelect;
