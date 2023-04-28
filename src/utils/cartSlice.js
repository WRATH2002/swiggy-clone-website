import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    qty: [],
    id: [],
    modalVisibility: false,
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      // console.log(state.items);
      state.qty = []; // Removing old qty quantity count
      const itemQuantity = state.items.reduce((acc, curr) => {
        if (acc[curr?.card?.info?.id]) {
          acc[curr?.card?.info?.id]++;
        } else {
          acc[curr?.card?.info?.id] = 1;
        }
        return acc;
      }, {});

      state.qty.push(itemQuantity);
    },

    removeItem: (state, action) => {
      const itemIndexLast = state.items.findLastIndex(
        item => action.payload.card?.info?.id === item.card?.info?.id
      );

      // only splice array when item is found
      if (itemIndexLast > -1) {
        // 2nd parameter means remove one item only
        state.items.splice(itemIndexLast, 1);
      }

      // Display current quantity
      state.qty[[0].toString(action.payload.card?.info?.id)][
        action.payload.card?.info?.id
      ]--;
    },

    getId: (state, action) => {
      state.id = [];
      state.id.push(action.payload);
    },

    clearCart: state => {
      state.items = [];
      state.qty = [];
      state.id = [];
    },

    showModal: state => {
      state.modalVisibility = !state.modalVisibility;
    },
  },
});

export const { addItem, removeItem, getId, clearCart, showModal } =
  cartSlice.actions;
export default cartSlice.reducer;
