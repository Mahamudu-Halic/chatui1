import Image from "next/image";
import React from "react";

const Member = () => {
  return (
    <div className="flex gap-2 items-center w-[250px]">
      <div className="relative overflow-hidden rounded-full bg-[#f5feac] text-black w-[50px] h-[50px] flex items-center justify-center font-light">
        <Image
          fill
          src={"/assets/profile.jpeg"}
          alt="profile"
          className="object-cover object-center"
        />
      </div>
      <p className="text-sm">Halic Mahamudu</p>
      <p className="text-xs ml-auto">Admin</p>
    </div>
  );
};

export default Member;
