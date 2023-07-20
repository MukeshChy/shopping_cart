import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { fetchCategories, fetchProducts, fetchSpecificCategoryProducts } from '../../shared/store/action';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../shared/interfaces/Product';
import { Pagination } from '@mui/material';

const Products = (): any => {

    const products = useSelector((state: any) => state.products.products);
    const total = useSelector((state: any) => state.products.total);
    const categories = useSelector((state: any) => state.products.categories);
    const searchKey = useSelector((state: any) => state.products.searchKey)

    const [pageNo, setPageNumber] = useState(1);
    const [totalPageNo, setTotalPageNo] = useState(8);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('searchKey', '');
        localStorage.setItem('pageNo', `${pageNo}`);
        dispatch(fetchProducts());
    }, [pageNo]);

    useEffect(() => {
        let totalPageNumbers = 1;

        const splittedArr =  (total/12).toString().split('.');
        const int = Number(splittedArr[0]);
        const dec = Number(splittedArr[1]);

        if (int === 0) {
            totalPageNumbers = 1;
            setTotalPageNo(1);
        } else if (dec >= 0) {
            totalPageNumbers = int > 0 ? int : totalPageNumbers;
            setTotalPageNo(int > 0 ? int : totalPageNumbers);
        }

    }, [total]);

    useEffect(() => {
        if (selectedCategory && selectedCategory.length) {
            dispatch(fetchSpecificCategoryProducts(selectedCategory));
        } else {
            dispatch(fetchProducts());
        }
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedCategory('');
    }, [searchKey])

    const navigateToProductDetails = (product: Product) => {
        navigate(`/products/${product.id}`);
    }

    const paginationHandler = (event: any, pageNo: number) => {
        setPageNumber(pageNo);
    }

    const categoryChangeHandler = (event: any) => {
        setSelectedCategory(event.target.value);
    }

    const onLoadCategory = () => {
        if(!categories.length) 
            dispatch(fetchCategories());
    }

    return  <>
                <Container maxWidth="xl">

                    <Grid
                        container>
                        <Grid
                            item
                            xs={12}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'end'}
                            alignItems={'end'}
                            marginTop={'1rem'}>
                                <Select
                                    id="demo-simple-select-standard"
                                    label={'Select Category'}
                                    value={selectedCategory}
                                    onOpen={onLoadCategory}
                                    onChange={(event: any) => {
                                        categoryChangeHandler(event) }}
                                    style={{
                                        width: '250px'
                                    }}
                                    >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {
                                        categories.map((category: any) => 
                                            <MenuItem value={category} key={category}>{category}</MenuItem>
                                        )
                                    }
                                </Select>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        spacing={4}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        paddingTop={'2rem'}>
                        {products.map((product: Product) => 
                            <Grid
                                item
                                marginTop={4}
                                key={product.id}
                                onClick={() => navigateToProductDetails(product)}>
                                <Card sx={{ minWidth: 345, maxWidth: 345 }}>
                                <CardHeader
                                    title={product.title}
                                    subheader={product.brand}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={product.thumbnail}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" style={{wordBreak: 'break-all'}}>
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton>
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                    <Pagination style={{ margin: '4rem 0', display: 'flex', justifyContent: 'center' }} variant='outlined' color='secondary' count={totalPageNo} onChange={paginationHandler} />
                </Container>
            </>

};


export default Products;