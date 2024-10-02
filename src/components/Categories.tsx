"use client";

import { getAllCategories } from "@/features/category/category.slice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const categories = useAppSelector(getAllCategories);
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id")?.split("?")[0];

  return (
    <div className="flex flex-col gap-3 overflow-auto">
      {categories.length &&
        categories.map((category) => (
          <button
            onClick={() => router.push(`/dashboard/?id=${category.id}`)}
            key={category?.id}
            className={`rounded-full ${
              category?.id === id ? "bg-[#f5feac] text-black" : "bg-[#313031]"
            } min-w-[50px] min-h-[50px] text-xl font-light p-2 flex justify-center items-center`}
          >
            {category?.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </button>
        ))}
    </div>
  );
};

export default Categories;
