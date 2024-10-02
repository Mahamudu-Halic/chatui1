import CategoryReducer from "@/features/category/category.slice";
import ChatReducer from "@/features/chat/chat.slice";
import AuthReducer from "@/features/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    category: CategoryReducer,
    chats: ChatReducer,
    auth: AuthReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
