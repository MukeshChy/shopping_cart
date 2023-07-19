import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";

export interface CartItem {
    productId: number;
    qty: number;
    product: Product;
};

export interface CartItemState {
    cartItems: CartItem[];
};

const cachedCartItems:any = localStorage.getItem('cartItems');

const initialState: CartItemState = {
    cartItems: cachedCartItems && JSON.parse(cachedCartItems) && JSON.parse(cachedCartItems).length ? JSON.parse(cachedCartItems) :  []
};

const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        initCartItem: (state, action) => {
            // const cartItemIndex = state.cartItems.findIndex(cartItem => cartItem.productId === action.payload.productId);
            // if (cartItemIndex === -1) {
            //     state.cartItems.push({
            //         productId: Number(action.payload.productId),
            //         qty: 1
            //     });

            //     localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            // }
        },
        updateCartItem: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex(cartItem => cartItem.productId === action.payload.cartItem.productId);
            if (cartItemIndex !== -1) {
                state.cartItems[cartItemIndex].qty = Number(action.payload.cartItem.qty);
            } else {
                state.cartItems = [...state.cartItems, action.payload.cartItem];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        deleteCartItem: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex(cartItem => cartItem.productId === action.payload.productId);
            if (cartItemIndex !== -1) {
                state.cartItems.splice(cartItemIndex, 1);
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
    }
});

export const { initCartItem, updateCartItem, deleteCartItem, clearCart } = cartItemSlice.actions;

export default cartItemSlice.reducer;