export type Messages = {
  sender: string;
  message: string;
  messageType: string;
  time: string;
  profile?: string;
  id: string;
};
export type ChatMessages = {
  date: string;
  messages: Messages[];
};

export type Chats = {
  chatId: string;
  name: string;
  profile: string;
  chatMessages: ChatMessages[];
};

export type Categories = {
  id: string;
  name: string;
};

export type NameIdPick = Pick<Categories, "name" | "id">;

export type RegisterType = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  profile?: string;
  uid: string;
  createdAt: string;
}

export type SigninType = {
  email: string;
  password: string;
}

export type UserInfoType = {
  name: string;
  profile?: string;
  email: string;
  uid: string;
}

export type UsersType = {
  name: string;
  password: string;
  email: string;
  profile?: string;
  uid: string
  createdAt: string;
  accessToken: string;
}