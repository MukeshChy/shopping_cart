import axios from "axios";
import { setProductDetail, setProducts, setCategories } from "./productSlice";

export const fetchProducts  = (): any => 
    async (dispatch: any) => {
        try {
            let url = 'https://dummyjson.com/products';
            const pageNo = Number(localStorage.getItem('pageNo'));
            const searchKey = localStorage.getItem('searchKey');

            if (searchKey && searchKey.length) {
                url = `${url}/search?q=${searchKey}`
            } else {
                url = `${url}?limit=12&skip=${12*pageNo}`
            }
            
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

export const fetchCategories = (): any =>

async (dispatch: any) => {
    try {
        const url = `https://dummyjson.com/products/categories`;
        axios.get(url)
        .then(res => {
            dispatch(setCategories(res.data));
        });
    } catch (error) {
        
    }
}

export const fetchSpecificCategoryProducts = (category: string): any =>

async (dispatch: any) => {
    try {
        if (!category || !category.length) {
            return;
        }
        const url = `https://dummyjson.com/products/category/${category}`;
        axios.get(url)
        .then(res => {
            dispatch(setProducts(res.data));
        });
    } catch (error) {
        
    }
}