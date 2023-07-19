import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';

const MyTable = (props: any) => {

    const qtyChangeHandler = (e: any, cartItem: any) => {
        props.onQTYChange({
            value: Number(e.target.value),
            cartItem: cartItem
        });
    }

    const actionsHandler = (cartItem: any, type: string) => {
        props.actionPerformed({
            type: type,
            cartItem: cartItem
        })
    };

    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ITEM</TableCell>
                        <TableCell align="right">DESCRIPTION</TableCell>
                        <TableCell align="right">PRICE</TableCell>
                        <TableCell align="right">QUANTITY</TableCell>
                        <TableCell align="right">TOTAL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cartItems.map((cartItem: any) => (
                        <TableRow
                            key={cartItem.product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <div style={{
                                        display: 'flex'
                                    }}>
                                    <Avatar
                                        src={cartItem.product.thumbnail}
                                        variant="square"
                                        sx={{ width: 120, height: 120 }} />
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            marginLeft: '1rem'
                                        }}>
                                        <h2 style={{marginTop: 0}}>{cartItem.product.title}</h2>
                                        <div
                                            style={{
                                                display: 'flex',
                                        }}>
                                            {props.enableEdit && <Button variant="outlined" startIcon={<EditIcon />} onClick={(() => actionsHandler(cartItem, 'edit'))}>Edit</Button>}
                                            {props.enableDelete && <Button variant="outlined" endIcon={<DeleteIcon />} color='error' style={{marginLeft: '1rem'}} onClick={(() => actionsHandler(cartItem, 'delete'))}>Delete</Button>}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell align="right">{cartItem.product.description}</TableCell>
                            <TableCell align="center">${cartItem.product.price}</TableCell>
                            <TableCell align="center">
                                {!props.disableInput && <TextField
                                    value={cartItem.qty}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    qtyChangeHandler(event, cartItem) }}
                                    style={{width: 60}}/> }
                                    {props.disableInput && <span>{cartItem.qty}</span>}
                            </TableCell>
                            <TableCell align="right">${cartItem.qty*cartItem.product.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTable;