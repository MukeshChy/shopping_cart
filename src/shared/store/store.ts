import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice";
import cartItemSlice from "./cartItemSlice";
import wishlistSlice from "./wishlistSlice";

const store = configureStore({
    reducer: {
        products: productsSlice,
        cartItems: cartItemSlice,
        wishlist: wishlistSlice
    }
});

export default store;