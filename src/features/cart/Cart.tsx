import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import MyTable from '../../shared/components/Table';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { clearCart, deleteCartItem, updateCartItem } from '../../shared/store/cartItemSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Cart = (): any => {

    const cartItems = useSelector((state: any) => state.cartItems.cartItems);
    const [total, setTotal] = useState(0);
    const [isCheckingOut, setCheckingOut] = useState(false);
    const [isOrderPlaced, setOrderPlaced] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();

    const {isCheckout} = state ? state : false;

    useEffect(() => {
        setTotal(
            cartItems.map((cartItem: any) => {
                return cartItem.qty * cartItem.product.price
            })
            .reduce((a: number, b: number) => a + b, 0)
        )
    }, [cartItems]);

    const updateQTY = (e: any) => {
        dispatch(updateCartItem({
            cartItem: {
                ...e.cartItem,
                qty: e.value
            }
        }));
    }

    const onActionPerformed = (e: any) => {
        switch (e.type) {
            case 'edit':
                navigate(`/products/${e.cartItem.productId}`);
                break;
            case 'delete':
                dispatch(deleteCartItem({productId: e.cartItem.productId}))
                break;
        }
    }

    const checkoutHandler = () => {
        setCheckingOut(true);
        setTimeout(() => {
            setOrderPlaced(true);
            setTimeout(() => {
                dispatch(clearCart())
                navigate('/');
            }, 2000);
        }, 2000);
    }

    const orderSummarySection =
    <Grid
        item
        xs={3}
        className='cart__right-section shadow'>
            <Grid item xs={12} className='border-bottom' display={'flex'}>
                <Grid item xs={8}>Sub-total</Grid>
                <Grid item xs={4} textAlign={'center'}><Typography variant="h6">${total}</Typography></Grid>
            </Grid>
            <Grid item xs={12} className='border-bottom' display={'flex'}>
                <Grid item xs={8}>Estimated Shipping</Grid>
                <Grid item xs={4} textAlign={'center'}>-</Grid>
            </Grid>
            <Grid item xs={12} className='border-bottom' display={'flex'}>
                <Grid item xs={8}>Standard</Grid>
                <Grid item xs={4} textAlign={'center'}>-</Grid>
            </Grid>
            <Grid item xs={12} className='border-bottom'  display={'flex'}mt={'1rem'}>
                <Grid item xs={8}><Typography variant="h6">ESTIMATED TOTAL</Typography></Grid>
                <Grid item xs={4} textAlign={'center'}><Typography variant="h6">${total}</Typography></Grid>
            </Grid>
    </Grid>

    const paymentSection =
    <Grid
        item
        xs={3}
        className='cart__right-section shadow bg-light'>
            <Grid item xs={12}>
                <Grid item xs={12} className='border-bottom'><Typography variant="h6">Payment Info</Typography></Grid>
            </Grid>

            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Payment method</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="cod"
                    name="radio-buttons-group">
                    <FormControlLabel value="cod" control={<Radio />} label="Cash on delivery" />
                    <FormControlLabel value="wallet" control={<Radio />} label="Wallet" />
                </RadioGroup>
            </FormControl>

    </Grid>

    const placeOrderBtnContent =
        <Button
            variant="contained"
            color="success"
            size='large'
            fullWidth={true}
            disabled={total === 0}
            onClick={(() => navigate('/checkout', {state: { isCheckout: true }}))}>
            PLACE ORDER
        </Button>;

    const checkOutBtnContent =
        <LoadingButton
            variant="contained"
            color="success"
            size='large'
            fullWidth={true}
            disabled={isCheckingOut}
            loading={isCheckingOut}
            onClick={checkoutHandler}>
            CHECKOUT
            
        </LoadingButton>

    return (
        <>
            <Grid
                container
                padding={'2rem'}>
                <Grid
                    item
                    xs={8}>
                    <MyTable cartItems={cartItems} onQTYChange={updateQTY} enableEdit={!isCheckout} enableDelete={!isCheckout} disableInput={isCheckout} actionPerformed={onActionPerformed} />
                </Grid>
                {!isCheckout && orderSummarySection}
                {isCheckout && paymentSection}
            </Grid>
            <Grid
                container
                padding={'0rem 2rem 2rem 2rem'}>
                <Grid
                    item
                    xs={3}
                    marginLeft={'auto'}>
                    {!isCheckout && placeOrderBtnContent}
                    {isCheckout && !isOrderPlaced && checkOutBtnContent}
                    {isOrderPlaced && <Alert severity="success">Order Placed!!!!!</Alert>}
                </Grid>
            </Grid>
        </>
    )
}

export default Cart;