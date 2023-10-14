import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  user: null,
};

export const registrationThunk = createAsyncThunk(
  "auth/registrationThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/register", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/login", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const profileUpdateThunk = createAsyncThunk(
  "auth/profileUpdateThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/profileUpdate", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    loggedOut: (state) => {
      state.isLoading = false;
      state.error = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registrationThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.user = null;
    });

    builder.addCase(registrationThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    });

    builder.addCase(registrationThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    });

    // for login route
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.user = null;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    });

    // for update profile thunk

    builder.addCase(profileUpdateThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(profileUpdateThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    });

    builder.addCase(profileUpdateThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
