import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Chats as ChatsType, Messages } from "../../../types";
import { RootState } from "@/app/store";
import { getTime } from "@/lib/hooks";
import toast from "react-hot-toast";

interface AllChats {
  id: string;
  chats: ChatsType[];
}

export interface ChatAddedPayload {
  id: string;
  chats: ChatsType;
}

interface InitialState {
  allChats: AllChats[];
  loading: "idle" | "pending" | "success" | "failed";
  error: string;
}

const initialState: InitialState = {
  loading: "idle",
  error: "",
  allChats: [
    {
      id: "1",
      chats: [
        {
          chatId: "lskdj",
          name: "Internet of Things",
          profile: "",
          chatMessages: [
            {
              date: "8 Sept 2024",
              messages: [
                {
                  message:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quidem!",
                  sender: "Joseph",
                  messageType: "text",
                  time: getTime(),
                  id: nanoid(),
                },

                {
                  message: "/assets/profile.jpeg",
                  sender: "you",
                  messageType: "image",
                  time: getTime(),
                  id: nanoid(),
                },
              ],
            },
          ],
        },
        {
          chatId: "lsdkjl",
          name: "General Metting",
          profile: "",
          chatMessages: [],
        },
      ],
    },
  ],
};

export const addedChat = createAsyncThunk(
  "chats/addedChat",
  async (value: ChatAddedPayload) => {
    const { id } = value;
    const { name } = value.chats;
    return new Promise<ChatAddedPayload>((resolve, reject) => {
      if (!id) {
        reject(new Error("chat category ID is required"));
        return;
      }
      if (!name.trim()) {
        reject(new Error("name is required"));
        return;
      }
      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  }
);

type SendMessage = {
  date: string;
  message: Messages;
  id: string;
  chatId: string;
};

export const messageSent = createAsyncThunk(
  "chats/messageSent",
  async (value: SendMessage) => {
    return new Promise<SendMessage>((resolve, reject) => {
      if (!value.message.message.trim()) {
        reject(new Error("message box cannot be empty"));
        return;
      }

      setTimeout(() => {
        resolve(value);
      }, 3000);
    });
  }
);

const ChatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add chat pending
    builder.addCase(addedChat.pending, (state) => {
      toast.remove();
      state.loading = "pending";
      state.error = "";
    });
    // add chat fulfilled
    builder.addCase(
      addedChat.fulfilled,
      (state, action: PayloadAction<ChatAddedPayload>) => {
        const { id, chats } = action.payload;
        const chatExists = state.allChats.find((chat) => chat.id === id);
        if (chatExists) {
          chatExists.chats.push(chats);
          state.loading = "success";
          state.error = "";
          toast.success("Added new chat")
        } else {
          state.loading = "failed";
          state.error = "chat category not found";
          toast.error("chat category not found")
        }
      }
    );
    builder.addCase(addedChat.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "failed to add chat";
      toast.error(action.error.message || "failed to add chat");
    });

    // send message pending
    builder.addCase(messageSent.pending, (state) => {
      state.loading = "pending";
      state.error = "";
      toast.remove();
    });

    // send message fulfilled
    builder.addCase(
      messageSent.fulfilled,
      (state, action: PayloadAction<SendMessage>) => {
        const { date, message, id, chatId } = action.payload;
        state.loading = "success";
        state.error = "";
        const chatsExists = state.allChats.find((chat) => chat.id === id);

        if (chatsExists) {
          const chat = chatsExists.chats.find((chat) => chat.chatId === chatId);

          if (chat) {
            const chatMessages = chat.chatMessages.find(
              (chatMessage) => chatMessage.date === date
            );

            if (chatMessages) {
              chatMessages.messages.push(message);
            } else {
              const newChatMessage = {
                date,
                messages: [message],
              };
              chat.chatMessages.push(newChatMessage);
            }
          }
        }
      }
    );
    // send message rejected
    builder.addCase(messageSent.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "something went wrong";
      toast.error(action.error.message || "something went wrong");
    });
  },
});

export const getChatMessagesByDate = (
  state: RootState,
  date: string,
  id: string,
  chatId: string
) => {
  const chat = getChatById(state, chatId, id);

  if (chat) {
    const chatMessages = chat.chatMessages.find(
      (message) => message.date === date
    );
    if (chatMessages) {
      return chatMessages?.messages;
    }
    return [];
  }
};

export const getChatsById = (state: RootState, id: string) =>
  state.chats.allChats.find((chat) => chat.id === id);

export const getAllChats = (state: RootState) => state.chats;

export const getChatById = (state: RootState, chatId: string, id: string) => {
  const allChatsById = getChatsById(state, id);

  if (allChatsById) {
    return allChatsById?.chats.find((chat) => chat.chatId === chatId);
  }
};

export default ChatSlice.reducer;
