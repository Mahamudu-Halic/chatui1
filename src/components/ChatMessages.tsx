"use client";
import ChatMessage from "./ChatMessage";
import ChatMessageInput from "./ChatMessageInput";
import Empty from "./Empty";
import { useEffect, useRef } from "react";
import { ChatMessages as ChatMessagesType } from "../../types";

const ChatMessages = ({
  chatMessages,
}: {
  chatMessages: ChatMessagesType[] | undefined;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth", // You can use 'auto' for instant scrolling
      });
    }
  };

  // Scroll to the bottom when the component mounts or updates
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  return (
    <div className="flex flex-col gap-3 bg-[#1b1a1b] rounded-2xl flex-[1.5] h-full py-5 justify-between">
      <div
        className="flex flex-col gap-5 h-[70vh] overflow-auto px-5"
        ref={scrollContainerRef}
      >
        {chatMessages?.length ? (
          chatMessages?.map((message) => (
            <ChatMessage key={message?.date} message={message} />
          ))
        ) : (
          <Empty label="no messages found" />
        )}
      </div>

      <ChatMessageInput />
    </div>
  );
};

export default ChatMessages;
