"use client";

import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import Categories from "./Categories";
import AddNewCategory from "./AddNewCategory";

const CategoriesSidebar = () => {
  const [addCate, setAddCate] = useState(false);

  const toggleAddCate = () => {
    setAddCate((prev) => !prev);
  };

  return (
    <>
      {addCate && <AddNewCategory toggleAddCate={toggleAddCate} />}
      <div className="flex flex-col justify-between bg-[#1b1a1b] h-full rounded-full p-5 items-center gap-3">
        <Categories />
        <button
          onClick={toggleAddCate}
          className="rounded-full bg-[#f5feac] text-black min-w-[50px] min-h-[50px] flex items-center justify-center font-light"
        >
          <PiPlusBold size={25} />
        </button>
      </div>
    </>
  );
};

export default CategoriesSidebar;
