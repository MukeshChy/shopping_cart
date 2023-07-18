import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { fetchProducts } from '../../shared/store/action';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../shared/interfaces/Product';
import { Pagination } from '@mui/material';

const Products = (): any => {

    const products = useSelector((state: any) => state.products.products);
    const total = useSelector((state: any) => state.products.total);

    const [pageNo, setPageNumber] = useState(1);
    const [totalPageNo, setTotalPageNo] = useState(8);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProducts(pageNo*12));
    }, [pageNo]);

    useEffect(() => {
        setTotalPageNo(8);
    }, [total]);

    const navigateToProductDetails = (product: Product) => {
        navigate(`/products/${product.id}`);
    }

    const paginationHandler = (event: any, pageNo: number) => {
        setPageNumber(pageNo);
    }

    return  <>
                <Container maxWidth="xl">
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