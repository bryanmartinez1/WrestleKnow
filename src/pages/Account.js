import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export default function Acount() {
  const [objectID, setObjectID] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [img, setImg] = useState();

  const navigate = useNavigate();

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    setUserId(currentUser.id);
    setFirstName(currentUser.get("firstName"));
    setLastName(currentUser.get("lastName"));
    let pfp = currentUser.get("pfp");
    let pfpSRC = JSON.stringify(pfp).split('url":"').pop().slice(0, -2);
    setImg(pfpSRC);
    return currentUser;
  };

  getCurrentUser();
// if current user null empty page ig?
// 

  return <div><h1>{userId}{firstName}{lastName}</h1><img src={img}/></div>;
}
