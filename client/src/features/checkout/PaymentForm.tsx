import { Typography, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

export default function PaymentForm() {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Ödeme Şekli
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            name='nameOnCard'
            label='Kart üzerindeki isim'
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="cardNumber"
            label="Kart Numarası"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="expDate"
            label="Son kullanma tarihi"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            // required
            id="cvv"
            label="CVV"
            helperText="Güvenlik kodu"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Kredi kartı bilgilerimi hatırla"
          />
        </Grid>
      </Grid>
    </>
  );
}