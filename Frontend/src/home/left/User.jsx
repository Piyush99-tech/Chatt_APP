import React from "react";
import useConversation from "../../statemanage/useConversation.jsx";
import { useSocket } from "../../context/SocketContext.jsx";

function User({ user }) {
  // Split name into first and last parts
 // console.log(user)
  const [firstName = "", lastName = ""] = user.fullname.split(" ");

  // DiceBear avatar using initials
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${firstName}%20${lastName}`;

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
 const { socket, onlineUsers } = useSocket();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 cursor-pointer ">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            className="w-10 h-10 rounded-full"
          />

        </div>
        </div>
        <div>
          <h1 className="text-lg font-semibold capitalize">{user.fullname}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
