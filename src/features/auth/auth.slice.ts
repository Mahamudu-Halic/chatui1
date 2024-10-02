import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  RegisterType,
  SigninType,
  UserInfoType,
  UsersType,
} from "../../../types";
import { RootState } from "@/app/store";
import toast from "react-hot-toast";

interface InitialState {
  loading: "idle" | "pending" | "success" | "failed";
  users: UsersType[];
  user: UserInfoType | null;
}

const initialState: InitialState = {
  loading: "idle",
  users: [],
  user: null,
};

export const userRegistered = createAsyncThunk(
  "auth/register",
  async (value: RegisterType) => {
    const { name, email, password, confirmPassword } = value;

    return new Promise<RegisterType>((resolve, reject) => {
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        reject(new Error("all fields are required"));
      }

      if (password !== confirmPassword) {
        reject(new Error("passwords do not match"));
      }

      setTimeout(() => resolve(value), 3000);
    });
  }
);

export const userSignedIn = createAsyncThunk(
  "auth/signin",
  async (value: SigninType) => {
    const { email, password } = value;
    return new Promise<SigninType>((resolve, reject) => {
      if (!email.trim() || !password.trim()) {
        reject(new Error("all fields are required"));
        return;
      }

      setTimeout(() => resolve(value), 3000);
    });
  }
);

export const fetchUser = createAsyncThunk("auth/fetchUser", (token: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(token), 3000);
  });
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedOut: (state) => {
      Cookies.remove("chatUIAuthToken");
      state.loading = "idle";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // register user pending
    builder.addCase(userRegistered.pending, (state) => {
      toast.remove();
      state.loading = "pending";
    });

    // register user fulfilled
    builder.addCase(
      userRegistered.fulfilled,
      (state, action: PayloadAction<RegisterType>) => {
        const { name, email, password, profile, uid, createdAt } =
          action.payload;

        // does user already exist
        const userExists = state.users.find((user) => user.email === email);

        if (userExists) {
          toast.error("user already exists");
          state.loading = "failed";
          return;
        }

        // create user if user does not exist
        if (!userExists) {
          const accessToken = nanoid();
          const newUser = {
            name,
            email,
            password,
            uid,
            createdAt,
            profile,
            accessToken,
          };

          const user = {
            name,
            email,
            profile,
            uid,
          };
          state.loading = "success";
          Cookies.set("chatUIAuthToken", accessToken, { expires: 3 });
          state.users.push(newUser);
          state.user = user;
          toast.success("account created successfully");
          return;
        }
      }
    );

    // register user failed
    builder.addCase(userRegistered.rejected, (state, action) => {
      state.loading = "failed";
      toast.error(action.error.message ?? "Something went wrong");
    });

    // sign in user pending
    builder.addCase(userSignedIn.pending, (state) => {
      state.loading = "pending";
      toast.remove();
    });

    // sign in user fulfilled
    builder.addCase(
      userSignedIn.fulfilled,
      (state, action: PayloadAction<SigninType>) => {
        const { email, password } = action.payload;

        // does user exist
        const userExists = state.users.find((user) => user.email === email);

        // user exists
        if (userExists) {
          const { name, email, profile, uid } = userExists;
          // is password correct?
          if (userExists.password === password) {
            Cookies.set("chatUIAuthToken", userExists.accessToken, {
              expires: 3,
            });
            const user = {
              name,
              email,
              profile,
              uid,
            };
            state.user = user;
            state.loading = "success";
            return;
          } else {
            toast.error("incorrect password");
            state.loading = "failed";
            return;
          }
        }

        // user does not exist
        if (!userExists) {
          toast.error("user does not exists");
          state.loading = "failed";
          return;
        }
      }
    );

    // sign in user failed
    builder.addCase(userSignedIn.rejected, (state, action) => {
      state.loading = "failed";
      toast.error(action.error.message ?? "something went wrong");
    });

    // fetch user pending
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = "pending";
      toast.remove();
    });

    // fetch user fulfilled
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        const accessToken = action.payload;
        const user = state.users.find(
          (user) => user.accessToken === accessToken
        );
        if (user) {
          const { name, profile, email, uid } = user;

          state.user = { name, profile, email, uid };
          state.loading = "success";
        } else {
          state.loading = "failed";
          toast.error("invalid token");
        }
      }
    );

    // fetch user failed
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = "failed";
      toast.error(action.error.message ?? "something went wrong");
    });
  },
});

export default AuthSlice.reducer;

export const { loggedOut } = AuthSlice.actions;

export const authLoading = (state: RootState) => state.auth.loading;

export const getUsers = (state: RootState) => state.auth.users;

export const getUser = (state: RootState, accessToken: string) =>
  state.auth.users.find((user) => {
    if (user.accessToken === accessToken) {
      const { name, profile, email, uid } = user;
      return { name, profile, email, uid };
    }
  });

export const currentUserInfo = (state: RootState) => state.auth.user;
