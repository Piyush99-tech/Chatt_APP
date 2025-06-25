import React from "react";
import useConversation from "../../statemanage/useConversation.jsx";
import { useSocket } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConversation } = useConversation();

  if (!selectedConversation) return null;

  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(selectedConversation._id);

  const encodedSeed = encodeURIComponent(selectedConversation.fullname);
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodedSeed}&fontWeight=700`;

  return (
    <div className="h-[12vh] px-5 py-4 bg-slate-900 text-white flex items-center gap-4 border-b border-slate-600 shadow">
      {/* Avatar */}
      <div className="relative">
        <img
          src={avatarUrl}
          className="w-12 h-12 rounded-full border-2 border-white shadow"
        />
        {/* Online Indicator */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-700 ${
            isOnline ? "bg-green-400" : "bg-gray-400"
          }`}
        ></span>
      </div>

      {/* User info */}
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold capitalize tracking-wide">
          {selectedConversation.fullname}
        </h1>
        <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
}

export default Chatuser;
