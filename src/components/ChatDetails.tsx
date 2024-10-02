"use client";
import React from "react";
import ChatMessages from "./ChatMessages";
import Navbar from "./Navbar";
import ChatInfo from "./ChatInfo";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { getChatById } from "@/features/chat/chat.slice";
import Empty from "./Empty";

const ChatDetails = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.split("?")[0] || "";
  const chatId = searchParams.get("id")?.split("chatId=")[1] || "";

  const chatMessages = useAppSelector((state) =>
    getChatById(state, chatId, id)
  )?.chatMessages;
  return (
    <div className="flex flex-col h-full gap-3 flex-1">
      <Navbar />
      <div className="flex gap-5 h-full">
        {chatMessages ? (
          <>
            <ChatMessages chatMessages={chatMessages} />
            <ChatInfo />
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ChatDetails;
