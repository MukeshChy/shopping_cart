import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { fetchProducts } from '../../shared/store/action';
import { updateSearchKey } from '../../shared/store/productSlice';

const Header = (props: any) => {

    const cartItems = useSelector((state: any) => state.cartItems.cartItems);
    const wishlistItems = useSelector((state: any) => state.wishlist.products);

    const [cartItemsCount, setCartItemsCount] = useState(null);
    const [wishlistItemsCount, setWishlistCount] = useState(null);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        setCartItemsCount(cartItems.length);
    }, [cartItems]);

    useEffect(() => {
        setWishlistCount(wishlistItems.length);
    }, [wishlistItems]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchKeyHandler = (event: any) => {
        setSearchKey(event.target.value);
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            localStorage.setItem('pageNo', '1');
            localStorage.setItem('searchKey', searchKey);
            dispatch(updateSearchKey(searchKey));
            dispatch(fetchProducts());
        }, 400);

        return(() => {
            clearTimeout(timerId);
        })
    }, [searchKey]);

    return(
    <AppBar position="static">
        <Toolbar>
            <Typography
                variant="button"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                onClick={(() => navigate('/'))}>
                SHOPPY
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }} >
                <TextField
                    variant="standard"
                    placeholder='Search...'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        searchKeyHandler(event) }}
                    style={{
                        backgroundColor: '#f9f9f9',
                        width: '400px',
                        padding: '0.25rem',
                        borderRadius: '0.25rem'
                    }} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton color="inherit" onClick={(() => navigate('/cart'))}>
                    <Badge badgeContent={wishlistItemsCount} color="error">
                        <FavoriteRoundedIcon />
                    </Badge>
                </IconButton>
                <IconButton style={{ marginLeft: '1rem' }} color="inherit" onClick={(() => navigate('/cart'))}>
                    <Badge badgeContent={cartItemsCount} color="error">
                        <ShoppingCartRoundedIcon />
                    </Badge>
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>);
};


export default Header;