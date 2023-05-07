import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} style={{height: 400}}>
            <Typography gutterBottom variant={'h3'}>Aradığın sayfayı bulamadık :(</Typography>
            <Divider />
            <Button component={Link} to='/catalog' fullWidth>Kataloga Geri Dön</Button>
        </Container>
    )
}
