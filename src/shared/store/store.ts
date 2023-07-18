import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import cartItemSlice from "./cartItemSlice";

const store = configureStore({
    reducer: {
        products: productsSlice,
        cartItems: cartItemSlice
    }
});

export default store;