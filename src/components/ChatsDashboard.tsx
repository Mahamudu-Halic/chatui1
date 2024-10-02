"use client";
import { useSearchParams } from "next/navigation";
import Chat from "./Chat";
import { useAppSelector } from "@/lib/hooks";
import { getChatsById } from "@/features/chat/chat.slice";
import { Button } from "./styled/button.styled.component";
import { useState } from "react";
import Empty from "./Empty";
import AddNewChat from "./AddNewChat";

const ChatsDashboard = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.split("?")[0] || "";

  const allChatsById = useAppSelector((state) => getChatsById(state, id));

  const [createChat, setCreateChat] = useState(false);

  const toggleCreateChat = () => {
    setCreateChat((prev) => !prev);
  };

  return (
    id && (
      <>
        {createChat && (
          <AddNewChat id={id} toggleCreateChat={toggleCreateChat} />
          // <AddNewCategory toggleAddCate={toggleCreateChat}/>
        )}
        <div className="flex flex-col h-full gap-3 w-[250px]">
          <Button variant="primary" onClick={toggleCreateChat}>
            create chat
          </Button>
          <div className="flex flex-col h-full gap-3 overflow-auto">
            {allChatsById?.chats.length ? (
              allChatsById.chats.map((chat) => (
                <Chat key={chat?.chatId} chat={chat} />
              ))
            ) : (
              <Empty label="no chats found" />
            )}
          </div>
        </div>
      </>
    )
  );
};

export default ChatsDashboard;
