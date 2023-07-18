import { useDispatch, useSelector } from 'react-redux';
import MyTable from '../../shared/components/Table';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { deleteCartItem, updateCartItem } from '../../shared/store/cartItemSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Cart = (): any => {

    const cartItems = useSelector((state: any) => state.cartItems.cartItems);
    const [total, setTotal] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

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

    return (
        <>
            <Grid
                container
                padding={'2rem'}
                marginTop={'4rem'}>
                <Grid
                    item
                    xs={8}>
                    <MyTable cartItems={cartItems} onQTYChange={updateQTY} actionPerformed={onActionPerformed} />
                </Grid>
                <Grid
                    item
                    xs={3}
                    p={'1rem'}
                    display={'flex'}
                    flexDirection={'column'}
                    marginLeft={'auto'}
                    className='shadow'>
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
            </Grid>
            <Grid
                container
                padding={'2rem'}>
                <Grid
                    item
                    xs={3}
                    marginLeft={'auto'}>
                    <Button
                        variant="contained"
                        color="success"
                        size='large'
                        fullWidth={true}>
                        PLACE ORDER
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Cart;