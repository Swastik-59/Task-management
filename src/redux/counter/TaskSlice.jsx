import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  searchTerm: "",
  activeFilter: "All Tasks",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { taskTitle, taskDesc } = action.payload;
      state.tasks.push({ id: Date.now(), title: taskTitle, desc: taskDesc, completed: false });
    },
    editTask: (state, action) => {
      const { id, newTitle, newDesc } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = newTitle;
        task.desc = newDesc;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    searchTask: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { addTask, editTask, deleteTask, searchTask, toggleCompletion, setActiveFilter } = taskSlice.actions;

export default taskSlice.reducer;
