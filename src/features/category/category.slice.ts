import { RootState } from "@/app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Categories, NameIdPick } from "../../../types";
import toast from "react-hot-toast";

interface InitialState {
  categories: Categories[];
  loading: "idle" | "pending" | "success" | "failed";
  error: string;
}

const initialState: InitialState = {
  categories: [
    {
      id: "1",
      name: "StudioIX",
    },
    {
      id: "3",
      name: "Atlas Labs",
    },
  ],
  loading: "idle",
  error: "",
};

export const postCategory = createAsyncThunk(
  "category/postCategory",
  async (value: NameIdPick) => {
    return new Promise<NameIdPick>((resolve, reject) => {
      if (!value.name.trim()) {
        reject(new Error("name is required"));
        return;
      }

      if (value.name.trim().length < 3) {
        reject(new Error("name should be at least 3 characters long"));
        return;
      }
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  }
);
const Category = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // post category pending
    builder.addCase(postCategory.pending, (state) => {
      toast.remove();
      state.loading = "pending";
      state.error = "";
    });
    // post category fulfilled
    builder.addCase(
      postCategory.fulfilled,
      (state, action: PayloadAction<NameIdPick>) => {
        state.loading = "success";
        const { name, id } = action.payload;
        const categoriItem = {
          name,
          id,
          chats: [],
        };
        state.categories.push(categoriItem);
        state.error = "";
        toast.success("Added category");
      }
    );
    // post category rejected
    builder.addCase(postCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "something went wrong";
      toast.error(action.error.message || "something went wrong");
    });
  },
});

// export const { addCategory } = Category.actions;

export const findCategoryById = (state: RootState, id: string) =>
  state?.category.categories.find((item) => item.id === id);

export const getCategory = (state: RootState) => state?.category;

export const getAllCategories = (state: RootState) =>
  state?.category.categories;

export default Category.reducer;
