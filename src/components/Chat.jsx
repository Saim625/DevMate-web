import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { format } from "date-fns";

const Chat = () => {
  const { targetedUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const chatContainerRef = useRef();

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetedUserId, {
      withCredentials: true,
    });

    const chatMessage = chat?.data?.messages?.map((msg) => {
      const { senderId, text, image, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        image,
        createdAt,
      };
    });
    setMessages(chatMessage);
    console.log(chatMessage);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetedUserId,
    });

    socket.on("messageReceived", ({ firstName, text, image, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, text, image, createdAt },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetedUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetedUserId,
      text: newMessage,
      image: user.imageURL,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto my-10 h-[80vh] flex flex-col border rounded-xl shadow-lg">
        {/* Chat Header */}
        <div className="p-4 border-b font-semibold text-lg bg-base-200">
          Chat
        </div>
        <div
          className="flex-1 overflow-y-scroll p-4 space-y-4 bg-base-100"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="Obi-Wan avatar" src={msg.image} />
                </div>
              </div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-2">
                  {format(new Date(msg.createdAt), "p")}
                </time>{" "}
              </div>
              <div
                className={
                  "chat-bubble " +
                  (user.firstName === msg.firstName
                    ? "chat-bubble-primary text-white"
                    : "chat-bubble-secondary text-white")
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-base-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered w-full"
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
