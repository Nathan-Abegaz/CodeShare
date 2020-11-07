import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RoomManager from "../components/RoomManager";
import NamePrompt from "../components/NamePrompt";

const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://codeshare-api-vxvdcx3l4q-uw.a.run.app:8080"
    : "localhost:5000";

const checkRoomName = async (roomName) => {
  const response = await axios.get(`${apiURL}/exists/${roomName}`);
  return response.status;
};

export default function RoomPage() {
  const { roomName } = useParams();
  const [displayName, setDisplayName] = useState("");
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
