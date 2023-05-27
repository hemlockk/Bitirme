import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){
    const dispatch = useAppDispatch();
    const {data,title} = useAppSelector(state=> state.counter);
    return (
        <Typography variant="h2">
            Contact Page
        </Typography>
        
    )
}