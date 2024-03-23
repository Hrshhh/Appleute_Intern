import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: <any>[]
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const itemIndex = state.cartItems.findIndex((item: any) => item.id === action.payload.id);

        if(itemIndex >= 0){
            state.cartItems[itemIndex].quantity += 1;
        }
        else{
            const newItems = {...action.payload, quantity: 1}
            state.cartItems = [...state.cartItems, newItems ]
        }
        
      },

      removeItem: (state, action) => {
        const items = state.cartItems.filter((item: any) => item?.id !== action.payload);
        state.cartItems = items;
      },

      decrementItem: (state, action) => {
        const itemIndex = state.cartItems.findIndex((item: any) => item.id === action.payload);

        if(state.cartItems[itemIndex].quantity >= 1){
            state.cartItems[itemIndex].quantity -= 1;
        }
      },

      removeAllItems: (state) => {
        state.cartItems = [];
      }
    },
})

export const {addToCart, removeItem, decrementItem, removeAllItems} = cartSlice.actions;

export default cartSlice.reducer;