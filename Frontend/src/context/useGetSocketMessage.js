import React, { useEffect } from "react";
import { useSocket } from "./SocketContext";
import useConversation from "../statemanage/useConversation.jsx";
import sound from "../assets/notification.mp3";
const useGetSocketMessage = () => {
  const { socket } = useSocket();
  const { messages, setMessage } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);
    });
    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage]);
};
export default useGetSocketMessage;