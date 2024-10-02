import { getAllChats, messageSent } from "@/features/chat/chat.slice";
import {
  convertBase64,
  getDate,
  getTime,
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrAttachment } from "react-icons/gr";
import { LuImagePlus } from "react-icons/lu";
import { TbSend } from "react-icons/tb";
import {
  ContentContainer,
  OverlayContainer,
} from "./styled/containers.styled.component";
import { Overlay } from "./styled/overlay.styled.component";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { Button } from "./styled/button.styled.component";

const ChatMessageInput = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("text");
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getAllChats).loading;
  const error = useAppSelector(getAllChats).error;

  const id = searchParams.get("id")?.split("?")[0] || "";
  const chatId = searchParams.get("id")?.split("chatId=")[1] || "";

  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64: string = await convertBase64(file);
      setMessage(base64);
      setMessageType("image");
    }
  };

  const sendMessage = () => {
    const newMessage = {
      sender: "Halic",
      message,
      messageType,
      time: getTime(),
      profile: "",
      id: nanoid(),
    };
    const chatMessage = {
      message: newMessage,
      id,
      chatId,
      date: getDate(),
    };

    dispatch(messageSent(chatMessage));
  };

  const handleMessageType = () => {
    setMessageType("text");
    setMessage("");
  };

  useEffect(() => {
    toast.remove();
    if (loading === "success") {
      setMessage("");
      setMessageType("text");

      return;
    }

    if (loading === "failed") {
      toast.error(error);
      setMessage("");
      return;
    }
  }, [loading, error]);

  return (
    <div className="w-full px-5 relative">

      {messageType === "image" && (
        <OverlayContainer>
          <Overlay onClick={() => loading !== "pending" && handleMessageType} />
          <ContentContainer>
            <CgClose
              className={`ml-auto ${
                loading === "pending" ? "cursor-no-drop" : "cursor-pointer"
              }`}
              onClick={() => loading !== "pending" && handleMessageType}
            />
            <div className="relative w-[200px] h-[200px] mx-auto">
              <Image
                fill
                src={message}
                alt="profile"
                className="object-cover object-center"
              />
            </div>
            <Button
              variant="standard"
              disabled={loading === "pending" ? true : false}
              className="disabled:cursor-no-drop ml-auto flex items-center gap-1"
              onClick={sendMessage}
            >
              Send
              <TbSend size={20} className="cursor-pointer" />
            </Button>
          </ContentContainer>
        </OverlayContainer>
      )}
      <div className="w-full rounded-3xl bg-[#313031] p-3 flex gap-3 items-center h-16">
        <button
          disabled={loading === "pending" ? true : false}
          className="disabled:cursor-no-drop"
        >
          <GrAttachment size={20} />
        </button>

        <input
          placeholder="Write a message..."
          type="text"
          className="w-full h-full border-none outline-none bg-transparent disabled:text-[#6a6767]"
          value={messageType !== "image" ? message : ""}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading === "pending" ? true : false}
        />

        <button
          disabled={loading === "pending" ? true : false}
          className="disabled:cursor-no-drop"
        >
          <label htmlFor="image">
            <LuImagePlus size={20} className="cursor-pointer" />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </button>
        <button
          disabled={loading === "pending" ? true : false}
          className="disabled:cursor-no-drop"
          onClick={sendMessage}
        >
          <TbSend size={20} className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessageInput;
