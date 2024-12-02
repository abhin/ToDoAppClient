import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/Message";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess("Login successful!");
      return data?.user;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);


export const verifyGoogleUser = createAsyncThunk(
  "auth/verifyGoogleUser",
  async ({ token, isExpired }, { rejectWithValue }) => {
    if (isExpired) {
      showError("Login expired. Please try again");
      return rejectWithValue("Login expired");
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/google/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await response.json();

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess(data.message);
      return data?.user;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    nextPage: null,
    loading: false,
    error: null,
  },
  reducers: {
    googleLogin: () => {
      window.open("http://localhost:8000/api/v1/auth/google", "_self");
    },
    logout: (state) => {
      state.authUser = null;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyGoogleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyGoogleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(verifyGoogleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const persistConfig = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const { googleLogin, logout, setAuthUser } = authSlice.actions;
export default persistedAuthReducer;