import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      return null;
    },
  },
});

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;

