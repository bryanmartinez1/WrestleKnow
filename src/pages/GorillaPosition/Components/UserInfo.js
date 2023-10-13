import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useParams } from "react-router-dom";
import defaultPFP from "./images/profile_icon.png";
import "./styles/userInfo.css";

export default function UserInfo() {
  const { username } = useParams(); // Accessing the route parameter
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [defaultpfp, setDefaultPFP] = useState(defaultPFP);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userQuery = new Parse.Query("GP_Profile");
    userQuery.equalTo("username", username);
    try {
      const userResult = await userQuery.find();
      setBio(userResult[0].get("bio"));
      setFirstName(userResult[0].get("first_name"));
      setLastName(userResult[0].get("last_name"));
      setDefaultPFP(
        JSON.stringify(userResult[0].get("pfp"))
          .split('url":"')
          .pop()
          .slice(0, -2)
      );
      console.log(username);
      return true;
    } catch (error) {
      console.error(JSON.stringify(error));
      return false;
    }
  };

  return (
    <div className="userInfoDiv">
      <img className="userPFP" src={defaultpfp} />
      <div className="userNamesDiv">
        <> {username}</>
        <>{firstName}</>
        <>{lastName}</>
      </div>
      {bio}
    </div>
  );
}
