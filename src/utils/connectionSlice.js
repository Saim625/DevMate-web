import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return state.filter((connection) => connection.connectionId.toString() != action.payload);
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
