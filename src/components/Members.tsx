import Image from "next/image";
import React from "react";
import Member from "./Member";

const Members = () => {
  return (
    <div className="bg-[#1b1a1b] rounded-xl p-3 w-full flex flex-col gap-3 flex-1 overflow-auto">
      <h3 className=" font-bold">Members</h3>

      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
    </div>
  );
};

export default Members;
