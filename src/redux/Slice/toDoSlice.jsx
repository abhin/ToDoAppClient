import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showError, showSuccess } from "../../Functions/utils";
import { fetchAPI } from "../../Functions/utils";

export const addTodo = createAsyncThunk(
  "ToDo/addTodo",
  async ({ title, description }, { rejectWithValue, getState }) => {
    const state = getState();
    const { authUser } = state.Auth;

    if (!authUser) {
      return rejectWithValue("User is not logged in!");
    }

    if (!title?.trim() || !description?.trim()) {
      return rejectWithValue("Title and description are required!");
    }

    try {
      const data = await fetchAPI(
        `${import.meta.env.VITE_API_BASE}/todos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authUser?.token,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (!data?.success) {
        return rejectWithValue(data?.message);
      }

      showSuccess(data?.message);
      return data;
    } catch (err) {
      return rejectWithValue(err?.message || "An unexpected error occurred");
    }
  }
);



export const getAllToDo = createAsyncThunk(
  "ToDo/getAllToDo",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const { authUser } = state.Auth;

    if (!authUser) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(
        `${import.meta.env?.VITE_API_BASE}/todos/read`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authUser?.token,
          },
        }
      );

      if (!data?.success) {
        showError(data?.message);
        return rejectWithValue(data?.message);
      }

      return data?.toDo;
    } catch (err) {
      showError(err?.message);
      return rejectWithValue(err?.message);
    }
  }
);

export const updateToDo = createAsyncThunk(
  "ToDo/updateToDo",
  async ({ id, completed }, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const { authUser } = state.Auth;

    if (!authUser) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(
        `${import.meta.env.VITE_API_BASE}/todos/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authUser?.token,
          },
          body: JSON.stringify({ id, completed }),
        }
      );

      if (!data?.success) {
        showError(data?.message);
        return rejectWithValue(data?.message);
      }

      dispatch(getAllToDo());
      showSuccess(data?.message);
      return id;
    } catch (err) {
      showError(err?.message);
      return rejectWithValue(err?.message);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "ToDo/deleteToDo",
  async ({ id }, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const { authUser } = state.Auth;

    if (!authUser) {
      showError("User is not logged in!");
      return rejectWithValue("User is not logged in!");
    }

    try {
      const data = await fetchAPI(
        `${import.meta.env.VITE_API_BASE}/todos/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authUser?.token,
          },
        }
      );

      if (!data?.success) {
        showError(data?.message);
        return rejectWithValue(data?.message);
      }

      dispatch(getAllToDo());
      showSuccess(data?.message);
      return id;
    } catch (err) {
      showError(err?.message);
      return rejectWithValue(err?.message);
    }
  }
);

const toDoSlice = createSlice({
  name: "ToDo",
  initialState: {
    toDos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setToDos: (state, action) => {
      state.toDos = [action.payload, ...state.toDos];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.toDos.unshift(action.payload?.toDo);
      })
      .addCase(getAllToDo.fulfilled, (state, action) => {
        state.toDos = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || "An error occurred.";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "idle";
          state.error = null;
        }
      );
  },
});

export const { setToDos } = toDoSlice.actions;
export default toDoSlice.reducer;
