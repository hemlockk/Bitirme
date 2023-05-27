import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";
import AppTextInput from "../../app/components/AppTextInput";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
      Teslimat Adresi
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name='fullName' label='İsim Ve Soyisim' />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name='address1' label='Adres 1' />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name='address2' label='Adres 2' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='city' label='İlçe' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='state' label='İl' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='zip' label='Zip Kodu' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name='country' label='Ülke' />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <AppCheckbox
          disabled={!formState.isDirty}
          name='saveAddress'
          label='Varsayılan adres olarak ayarla'
          control={control}
        />
      </Grid>
    </>
  );
}