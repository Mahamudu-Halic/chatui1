"use client";

import Image from "next/image";
import { Chats } from "../../types";
import { useRouter, useSearchParams } from "next/navigation";
import { BsImageFill } from "react-icons/bs";

const Chat = ({ chat }: { chat: Chats }) => {
  const lastMessage = chat?.chatMessages.length
    ? chat?.chatMessages.slice().reverse()[0].messages.slice().reverse()[0]
    : { sender: "", message: "", messageType: "" };

  const text = lastMessage?.message;

  const message = text.length > 20 ? text.slice(0, 20) + "..." : text;

  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.split("?")[0] || "";
  const chatId = searchParams.get("id")?.split("chatId=")[1] || "";
  return (
    <div
      onClick={() => router.push(`/dashboard/?id=${id}?chatId=${chat?.chatId}`)}
      className={`flex gap-2 items-center p-3 rounded-xl  w-[250px] cursor-pointer hover:bg-[#313031] ${
        chat?.chatId === chatId ? "bg-[#313031]" : "bg-[#1b1a1b]"
      } transition-all`}
    >
      {/* chat profile */}
      {chat?.profile ? (
        <div className="relative overflow-hidden rounded-full bg-[#f5feac] text-black min-w-[50px] h-[50px] flex items-center justify-center font-light">
          <Image
            fill
            src={chat?.profile}
            alt="profile"
            className="object-cover object-center rounded-full"
          />
        </div>
      ) : (
        <div className="rounded-full bg-[#f5feac] text-black min-w-[50px] h-[50px] flex items-center justify-center font-light">
          {chat?.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
      )}
      {/* message */}
      <div>
        <h3 className="text-[#f3f3f3]">{chat?.name}</h3>
        {lastMessage.message && (
          <span className="flex items-center gap-2">
            <p className="text-xs text-[#b4b5b4] ">{lastMessage.sender}:</p>
            {lastMessage.messageType === "text" ? (
              <p className="text-xs">{message}</p>
            ) : (
              <span className="flex items-center gap-2">
                <p className="text-xs">image</p> <BsImageFill size={15} />
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Chat;
