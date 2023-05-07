import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails(){
    const{basket, setBasket, removeItem} = useStoreContext();
    const {id} = useParams<{id: string}>();
    const[product,setProduct] = useState<Product | null>(null);
    const[loading,setLoading] = useState(true);
    const[quantity,setQuantity] = useState(0);
    const[submitting,setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(()=> setLoading(false));
    }, [id, item])

    
    function handleInputChange(e: any) {
        if (e.target.value >= 0)
            setQuantity(parseInt(e.target.value));
    }

    function handleUpdateCart() {
        setSubmitting (true);
        if (!item || quantity > item?.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!,updatedQuantity)
                .then(basket=> setBasket(basket))
                .catch(error=> console.log(error))
                .finally(() => setSubmitting(false))
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!,updatedQuantity)
                .then(()=> removeItem(product?.id!,updatedQuantity))
                .catch(error=> console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if(loading) return <LoadingComponent />

    if(!product) return <NotFound></NotFound>

    return (
        <Grid container spacing={6}>
             <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}></img>
             </Grid>
             <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}></Divider>
                <Typography variant='h4' color='secondary'>{(product.price/100).toFixed(2)} TL</Typography>
             
             <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Ürün Adı</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Açıklama</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Ürün Tipi</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Marka</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Stok</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
             </TableContainer>
             <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                        onChange={handleInputChange}
                        variant='outlined'
                        type='number'
                        label='Sepetteki Miktar'
                        fullWidth
                        value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                        disabled={item?.quantity === quantity || !item && quantity === 0}
                        loading={submitting}
                        onClick={handleUpdateCart}
                        sx={{height:'55px'}}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth
                        >
                            {item ? 'Sepetteki Miktarı Güncelle' : 'Ürünü Sepete Ekle'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}