import { useEffect, useState } from "react";
import {
  ContentContainer,
  OverlayContainer,
} from "./styled/containers.styled.component";
import { Overlay } from "./styled/overlay.styled.component";
import Image from "next/image";
import { Button } from "./styled/button.styled.component";
import { HashLoader } from "react-spinners";
import {
  addedChat,
  ChatAddedPayload,
  getAllChats,
} from "@/features/chat/chat.slice";
import { nanoid } from "@reduxjs/toolkit";
import { convertBase64, useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BsImageAlt } from "react-icons/bs";

const AddNewChat = ({
  toggleCreateChat,
  id,
}: {
  id: string;
  toggleCreateChat: () => void;
}) => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(getAllChats);

  const handleSubmit = () => {
    const newChat: ChatAddedPayload = {
      id,
      chats: {
        chatId: nanoid(),
        name,
        profile,
        chatMessages: [],
      },
    };

    dispatch(addedChat(newChat));
  };

  useEffect(() => {
    if (error) {
      setName("");
    }
    if (loading === "success") {
      setName("");
      toggleCreateChat();
    }
  }, [loading, error]);
  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64: string = await convertBase64(file);
      setProfile(base64);
    }
  };
  return (
    <OverlayContainer>
      <Overlay onClick={toggleCreateChat} />
      <ContentContainer>
        <h3 className="text-xl font-bold">Add New Chat</h3>
        <div className="flex flex-col gap-3">
          <label htmlFor="name">Name</label>
          <input
            placeholder="soc"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-[#403e3e] rounded-xl"
            disabled={loading === "pending" ? true : false}
          />
          <label
            className="bg-[#b4b5b4] border rounded-xl p-3 h-[150px] w-full flex flex-col items-center justify-center cursor-pointer"
            htmlFor="profile"
          >
            {profile ? (
              <div className="relative w-[130px] h-[130px]">
                <Image
                  fill
                  src={profile}
                  alt="profile"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <BsImageAlt size={50} />
                <p>Upload Image</p>
              </div>
            )}
          </label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e)}
            accept=".jpg, .jpeg, .png"
            id="profile"
            className="hidden"
          />
          <Button
            variant="secondary"
            disabled={loading === "pending" ? true : false}
            onClick={handleSubmit}
          >
            {loading === "pending" ? (
              <HashLoader size={21} color="white" />
            ) : (
              "Add Chat"
            )}
          </Button>
        </div>
      </ContentContainer>
    </OverlayContainer>
  );
};

export default AddNewChat;
