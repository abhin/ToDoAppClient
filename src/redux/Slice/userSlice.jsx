import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/utils";
import { fetchAPI } from "../../Functions/utils.jsx";
import { setAuthUser } from "./authSlice";

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await fetchAPI(
        `${import.meta.env.VITE_API_BASE}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      if (!data.success) {
        showError(data.message);
        return rejectWithValue(data.message);
      }

      showSuccess(data.message);
      return data;
    } catch (err) {
      showError(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ formData }, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    const { authUser } = state.Auth;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/users/updateprofile`,
        {
          method: "PUT",
          headers: {
            Authorization: authUser?.token,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showError(
          data.message || "An error occurred while updating the profile."
        );
        return rejectWithValue(data.message || "Failed to update profile.");
      }

      showSuccess(data.message || "Profile updated successfully!");
      dispatch(setAuthUser(data?.user));
      return data?.user;
    } catch (err) {
      showError(err.message || "An unexpected error occurred.");
      return rejectWithValue(err.message || "Failed to update profile.");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
