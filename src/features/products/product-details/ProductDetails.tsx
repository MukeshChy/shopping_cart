import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../../shared/store/action';
import { useEffect, useState } from 'react';
import './ProductDetails.css'
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { updateCartItem } from '../../../shared/store/cartItemSlice';

const ProductDetails = (): any => {

    const product = useSelector((state: any) => state.products.selectedProduct);
    const cartItems = useSelector((state: any) => state.cartItems.cartItems);
    console.log(cartItems);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const params = useParams();
    const productId =  params.productId!;

    useEffect(() => {
        dispatch(fetchProductDetail(productId));
    }, [productId]);

    
    const [currentCartItem, setCurrentCartItem] = useState({
        productId: +productId,
        qty: 1
    });

    useEffect(() => {
        const index = cartItems.findIndex((cartItem: any) => cartItem.productId === +productId);
        if (index !== -1) {
            setCurrentCartItem(cartItems[index]);
        }
    }, [cartItems]);

    useEffect(() => {
        setCurrentCartItem((previousValue) => {
            return {
                ...previousValue,
                product: product
            }
        })
    }, [product])

    const swapHandler = (url: string) => {
    };

    const qtyChangeHandler = (event: any) => {
        setCurrentCartItem((previousValue) => {
            return {
                ...previousValue,
                qty: +event.target.value
            };
        });
    }

    const addToCartHandler = () => {
        dispatch(updateCartItem({
            cartItem: {...currentCartItem}
        }));
        navigate('/cart');
    }

    return <>
            {product &&
            <Container maxWidth="xl">
            <Grid
                container
                spacing={2}
                className='shadow'
                padding={'0.5rem'}
                marginTop={'6rem'}>
                <Grid
                    item
                    xs={5}
                    display={'flex'}
                    flexDirection={'column'}
                    style={{padding: '0px'}}>
                        <Avatar
                            src={product.thumbnail}
                            variant="square"
                            sx={{ width: 'auto', height: 500 }} />
                        
                        <div
                            className='carousel'>
                            {
                                product.images.map((image: any) => 
                                    <Avatar
                                        variant="square"
                                        key={image}
                                        src={image}
                                        className='carousel-item'
                                        sx={{ width: 100, height: 100 }}
                                        onClick={(() => swapHandler(image))} />
                                )
                            }
                        </div>

                </Grid>
                <Grid
                    item xs={6}
                    display={'flex'}
                    flexDirection={'column'}>
                        <Typography variant="h4">
                            {product.title}
                            {product.stock > 0 && <Chip variant="outlined" color="info" label="IN STOCK" style={{margin: 'auto 2rem'}} />}
                        </Typography>
                        <Rating name="read-only" value={product.rating} readOnly />
                        <Typography variant="h3" my={2}>${product.price}</Typography>
                        <Typography variant="body1" my={2}>
                            {product.description}
                        </Typography>
                        <div
                            style={{
                                display: 'flex'
                            }}>
                            <TextField
                                id="qty"
                                label="QTY"
                                variant="outlined"
                                type="number"
                                value={currentCartItem.qty}
                                onChange={qtyChangeHandler}/>
                        </div>
                        <Stack direction="row" spacing={2} my={2}>
                            <Button variant="outlined" size="large" startIcon={<FavoriteIcon />}>
                                WISHLIST
                            </Button>
                            <Button variant="contained" size="large" endIcon={<AddShoppingCartIcon />} onClick={addToCartHandler}>
                                ADD TO CART
                            </Button>
                        </Stack>
                </Grid>
            </Grid>
            </Container>}
        </>

};

export default ProductDetails;