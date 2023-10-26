import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  dashboard: [],
  new: [],
  completed: [],
  pending: [],
  canceled: [],
};

export const createTaskThunk = createAsyncThunk(
  "task/createTaskThunk",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/createTask", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const getTaskByStatusThunk = createAsyncThunk(
  "task/getTaskByStatusThunk",
  async (status, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/listTaskByStatus/${status}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);
export const taskByStatusCountThank = createAsyncThunk(
  "task/taskByStatusCountThank",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/TaskByStatusCount`);

      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTask: (state) => {
      state.isLoading = false;
      state.error = "";
      state.dashboard = [];
      state.new = [];
      state.completed = [];
      state.pending = [];
      state.canceled = [];
    },
    deleteTask: (state, action) => {
      const remainingTask = state[action.payload.status].filter(
        (item) => item._id !== action.payload._id
      );

      state.isLoading = false;
      state.error = "";
      state[action.payload.status] = remainingTask;
    },
    updateTask: (state, action) => {
      const remainingTask = state[action.payload.status].filter(
        (item) => item._id !== action.payload._id
      );

      state[action.payload.status] = [...remainingTask];
      state.isLoading = false;
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    // create new task
    builder.addCase(createTaskThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.new = [...state.new, action.payload.data];
    });

    builder.addCase(createTaskThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // get task by status
    builder.addCase(getTaskByStatusThunk.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getTaskByStatusThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state[action.payload.data[0]?.status] = action.payload.data;
    });

    builder.addCase(getTaskByStatusThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // get taskByStatusCount
    builder.addCase(taskByStatusCountThank.pending, (state) => {
      state.isLoading = true;
      state.error = "";
      state.dashboard = [];
    });

    builder.addCase(taskByStatusCountThank.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.dashboard = action.payload.data;
    });

    builder.addCase(taskByStatusCountThank.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default taskSlice.reducer;
export const { deleteTask, updateTask, clearTask } = taskSlice.actions;
