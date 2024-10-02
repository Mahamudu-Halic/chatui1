import { useEffect, useState } from "react";
import {
  ContentContainer,
  OverlayContainer,
} from "./styled/containers.styled.component";
import { Overlay } from "./styled/overlay.styled.component";
import { Button } from "./styled/button.styled.component";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCategory, postCategory } from "@/features/category/category.slice";
import { nanoid } from "@reduxjs/toolkit";
import { HashLoader } from "react-spinners";

const AddNewCategory = ({ toggleAddCate }: { toggleAddCate: () => void }) => {
  const [categoryName, setCategoryName] = useState("");

  const { loading, error } = useAppSelector(getCategory);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const newCategory = {
      id: nanoid(),
      name: categoryName,
    };

    dispatch(postCategory(newCategory));
  };

  useEffect(() => {
    if (error) {
      setCategoryName("");
    }
    if (loading === "success") {
      setCategoryName("");
      toggleAddCate();
    }
  }, [loading, error]);
  return (
    <OverlayContainer>
      <Overlay onClick={toggleAddCate} />
      <ContentContainer>
        <h3 className="text-xl font-bold">Add New Category</h3>
        <div className="flex flex-col gap-3">
          <label htmlFor="categoryName">Category Name</label>
          <input
            placeholder="soc"
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="p-2 border border-[#403e3e] rounded-xl"
            disabled={loading === "pending" ? true : false}
          />
          <Button
            variant="secondary"
            disabled={
              loading === "pending" ? true : false
            }
            onClick={handleSubmit}
          >
            {loading === "pending" ? (
              <HashLoader size={21} color="white" />
            ) : (
              "Add Category"
            )}
          </Button>
        </div>
      </ContentContainer>
    </OverlayContainer>
  );
};

export default AddNewCategory;
