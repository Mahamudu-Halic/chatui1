import React from "react";
import { BsPinAngle } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineUsers } from "react-icons/hi";
import { VscDeviceCameraVideo } from "react-icons/vsc";

const InfoItems = () => {
  return (
    <div className="bg-[#1b1a1b] rounded-xl p-3 w-full flex items-center justify-between">
      <div className="relative overflow-hidden rounded-full bg-[#f5feac] text-black w-[50px] h-[50px] cursor-pointer flex items-center justify-center">
        <FiPhoneCall size={20} />
      </div>
      <div className="relative overflow-hidden rounded-full bg-[#313031] hover:bg-[#f5feac] hover:text-black w-[50px] h-[50px] cursor-pointer flex items-center justify-center">
        <VscDeviceCameraVideo size={20} />
      </div>
      <div className="relative overflow-hidden rounded-full bg-[#313031] hover:bg-[#f5feac] hover:text-black w-[50px] h-[50px] cursor-pointer flex items-center justify-center">
        <BsPinAngle size={20} />
      </div>
      <div className="relative overflow-hidden rounded-full bg-[#313031] hover:bg-[#f5feac] hover:text-black w-[50px] h-[50px] cursor-pointer flex items-center justify-center">
        <HiOutlineUsers size={20} />
      </div>
    </div>
  );
};

export default InfoItems;
