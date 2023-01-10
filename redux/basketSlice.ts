import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductsData } from '../types/types';

export interface BasketState {
  items: ProductsData[];
}

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {

    addToBasket: (state: BasketState, action: PayloadAction<ProductsData>) => {
      console.log('addToBasket....');
      state.items = [...state.items, action.payload];
    },

    removeFromBasket: (
      state: BasketState,
      action: PayloadAction<{ id: string }>
    ) => {
      console.log('removeFromBasket...');
      const index = state.items.findIndex(
        (item: ProductsData) => item._id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors -> retrieving items in state to use in different components
export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithId = (state: RootState, id: string) => {
  state.basket.items.filter((item: ProductsData) => item._id === id);
};

export const selectBasketTotal = (state: RootState) =>
  state.basket.items.reduce(
    (total: number, item: ProductsData) => (total += item.price),
    0
  );
  
export default basketSlice.reducer;