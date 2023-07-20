import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";

export interface WishListItem {
    productId: number;
    product: Product;
};

export interface WishlistState {
    products: WishListItem[];
};

const wishlistedItems: any = localStorage.getItem('wishlist');

const initialState: WishlistState = {
    products: wishlistedItems && JSON.parse(wishlistedItems) && JSON.parse(wishlistedItems).length ? JSON.parse(wishlistedItems) :  []
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        updateWishlist: (state, action) => {
            const index = state.products.findIndex(item => item.productId === action.payload.productId);
            if (index === -1) {
                state.products.push({
                    product: action.payload.product,
                    productId: action.payload.productId
                })
            } else {
                state.products.splice(index, 1);
            }
            localStorage.setItem('wishlist', JSON.stringify(state.products));
        }
    }
});

export const { updateWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;