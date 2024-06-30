import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (state, action) => {
        const existingUser = state.find(user => user.id === action.payload.id);
        if (!existingUser) {
          state.push(action.payload);
        }
      },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const user = state.find(user => user.id === id);
      if (user) {
        Object.keys(updates).forEach(key => {
          user[key] = updates[key];
        });
      }
    },
    deleteUser: (state, action) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
