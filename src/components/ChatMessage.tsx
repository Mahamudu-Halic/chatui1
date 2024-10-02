import Image from "next/image";
import React from "react";
import { ChatMessages } from "../../types";

const ChatMessage = ({ message }: { message: ChatMessages }) => {

  return (
    <>
      <div className="w-full p-5">
        <p className="bg-[#313031] px-5 py-2 rounded-full w-fit mx-auto text-sm">
          {message?.date}
        </p>
      </div>
      {message?.messages.length &&
        message?.messages.map((item) => (
          <div className="flex gap-3 w-full" key={item?.id}>
            {/* user profile */}
            {item?.profile ? (
              <div className="relative overflow-hidden rounded-full bg-[#f5feac] text-black min-w-[50px] h-[50px] flex items-center justify-center font-light">
                <Image
                  fill
                  src={item?.profile}
                  alt="profile"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="rounded-full bg-[#f5feac] text-black min-w-[50px] h-[50px] flex items-center justify-center font-light">
                {item?.sender
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
            )}
            {/* message */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-3">
                {/* sender */}
                <h3 className="text-[#f3f3f3] font-bold text-xl">
                  {item?.sender}
                </h3>
                <p className="text-xs text-[#b4b5b4]">{item?.time}</p>
              </div>
              {/* message type */}
              {item?.messageType === "image" && (
                <div className="relative w-[10rem] h-[10rem]">
                  <Image
                    fill
                    src={item?.message}
                    alt="image"
                    className="object-cover object-center rounded-3xl"
                  />
                </div>
              )}
              {item?.messageType === "text" && (
                <p className=" text-[#b4b5b4]">{item?.message}</p>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default ChatMessage;
