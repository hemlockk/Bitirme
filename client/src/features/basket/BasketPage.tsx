import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { Link } from "react-router-dom";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {

    const {basket, setBasket,removeItem} = useStoreContext()
    const [status, setStatus] = useState({
      loading: false,
      name: ''
    });

    function handleAddItem(productId: number, name: string){
      setStatus({loading: true, name});
      agent.Basket.addItem(productId)
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(()=>setStatus({loading: false, name:''}))
    }

    function handleRemoveItem(productId: number, quantity = 1,name: string){
      setStatus({loading: true, name});
      agent.Basket.removeItem(productId, quantity)
        .then(() => removeItem(productId,quantity))
        .catch(error => console.log(error))
        .finally(()=>setStatus({loading: false, name:''}))
    }

    if (!basket) return <Typography variant="h3">Sepetiniz Boş</Typography>

    return (
        <>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Ürün</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="center">Miktar</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box>
                  <img src = {item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}}/>
                  <span>{item.name}</span>
                </Box>
                
              </TableCell>
              <TableCell align="right">{(item.price / 100)} TL</TableCell>
              <TableCell align="center">
                <LoadingButton 
                loading={status.loading && status.name === 'rem' + item.productId} 
                onClick={() => handleRemoveItem(item.productId, 1, 'rem' + item.productId)} 
                color='error'>
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton 
                loading={status.loading && status.name === 'add' + item.productId} 
                onClick={() => handleAddItem(item.productId, 'add' + item.productId)}  
                color='secondary'>
                  <Add/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{(item.price * item.quantity / 100)} TL</TableCell>
              <TableCell align="right">
                <LoadingButton 
                loading={status.loading && status.name === 'del' + item.productId} 
                onClick={() => handleRemoveItem(item.productId, item.quantity, 'del' + item.productId)}  
                color='error'>
                    <Delete />
                </LoadingButton>
              </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Grid container>
      <Grid item xs = {6}/>
        <Grid item xs = {6}>
          <BasketSummary/>
            <Button 
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
            >
              Checkut
            </Button>
        </Grid>
    </Grid>
        </>

    )
}