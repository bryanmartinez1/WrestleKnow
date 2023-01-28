import { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export default function Acount() {
  const [objectID, setObjectID] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  return <h1>Account</h1>;
}
