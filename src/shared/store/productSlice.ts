import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../interfaces/Product";

export interface ProductState {
    products: Product[],
    pageNo: number,
    pageSize: number,
    total?: number,
    selectedProduct?: Product; 
}

const initialState: ProductState = {
    products: [],
    pageNo: 1,
    pageSize: 12
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            const products = action.payload.products.map((product: Product) => {
                return {
                    ...product,
                    title: product.title.length > 25 ? product.title.slice(0, 24) : product.title,
                    description: product.description.length > 80 ? `${product.description.slice(0, 79)}...` : product.description
                }
            })
            state.products = products;
            state.total = action.payload.total;
        },
        setProductDetail: (state, action) => {
            state.selectedProduct = action.payload
        }
    }
});

export const { setProducts, setProductDetail } = productsSlice.actions;

export default productsSlice.reducer;