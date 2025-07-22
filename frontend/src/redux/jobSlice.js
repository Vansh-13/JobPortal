import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    searchJobByText: "",  // ✅ Fixed this line
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setAllJobs, setAllAdminJobs, setSearchByText } = jobSlice.actions;
export default jobSlice.reducer;
