import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import RoomManager from "../components/RoomManager";
import NamePrompt from "../components/NamePrompt";
import apiURL from "../constants/apiURL";

const checkRoomName = async (roomName) => {
  const response = await axios.get(`${apiURL}/exists/${roomName}`);
  return response.status;
};

// /room/:roomName
// 'displayName'
// /room/defaultRoom
export default function RoomPage() {
  const location = useLocation();
  const { roomName } = useParams();
  const { passedInDisplayName } = location;
  console.log("Passed in: ", passedInDisplayName);

  const [displayName, setDisplayName] = useState(passedInDisplayName);
  const { status } = useQuery("room", () => checkRoomName(roomName), {
    retry: 0,
  });

  if (status === "loading") {
    return <span>Loading...</span>;
  } else if (status === "error") {
    return <span>404 Error: The room {roomName} does not exist</span>;
  } else if (displayName === "") {
    return <NamePrompt setDisplayName={setDisplayName} />;
  } else {
    return <RoomManager roomName={roomName} displayName={displayName} />;
  }
}
