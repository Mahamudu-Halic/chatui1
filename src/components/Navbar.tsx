"use client"
import { getChatById } from "@/features/chat/chat.slice";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import AccountProfile from "./AccountProfile";

const Navbar = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.split("?")[0] || "";
  const chatId = searchParams.get("id")?.split("chatId=")[1] || "";

  const name = useAppSelector((state) => getChatById(state, chatId, id))?.name;
  return (
    <div className="py-3 flex justify-between items-center w-full">
      <h2 className="text-3xl font-bold">{name}</h2>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 bg-[#1b1a1b] rounded-full p-3 overflow-hidden">
          <BiSearch size={25} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none text-white h-full outline-none w-full"
          />
        </div>
        <button className="rounded-full bg-[#1b1a1b] text-black w-[50px] h-[50px] flex items-center justify-center font-light">
          <LuSettings size={25} color={"#f3f3f3"} />
        </button>
        <button className="rounded-full bg-[#1b1a1b] text-black w-[50px] h-[50px] flex items-center justify-center font-light">
          <BiBell size={25} color={"#f3f3f3"} />
        </button>
        <AccountProfile />
      </div>
    </div>
  );
};

export default Navbar;
