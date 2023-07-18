import axios from "axios";
import { setProductDetail, setProducts } from "./productSlice";

export const fetchProducts  = (skip: number): any => 
    async (dispatch: any) => {
        try {
            const url = `https://dummyjson.com/products?limit=12&skip=${skip}`;
            axios.get(url)
            .then(res => {
                dispatch(setProducts(res.data));
            });
        } catch (error) {
            
        }
    };


export const fetchProductDetail = (productId: string): any => 

async (dispatch: any) => {
    try {
        const url = `https://dummyjson.com/products/${productId}`;
        axios.get(url)
        .then(res => {
            dispatch(setProductDetail(res.data));
        });
    } catch (error) {
        
    }
};