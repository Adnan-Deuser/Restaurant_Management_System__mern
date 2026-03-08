import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const existingItem = state.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    removeItems: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    removeAllItems: (state) =>{
        return [];
    }
  }
});

export const getTotalPrice = (state) =>
  state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const { addToCart, removeItems,removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;