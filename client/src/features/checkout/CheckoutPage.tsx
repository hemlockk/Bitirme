import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from "./checkoutValidation";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";

const steps = ['Teslimat Adresi', 'Siparişiniz', 'Ödeme Şekli'];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        case 2:
            return <PaymentForm />;
        default:
            throw new Error('Unknown step');
    }
}

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentValidationSchema)
    })

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response) {
                    methods.reset({ ...methods.getValues(), ...response, saveAddress: false })
                }
            })
    }, [methods])

    const handleNext = async (data: FieldValues) => {
        const { nameOnCard, saveAddress, ...shippingAddress } = data;
        if (activeStep === steps.length - 1) {
            setLoading(true);
            try {
                const order = await agent.Orders.create({ saveAddress, shippingAddress });
                setOrderNumber(order);
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">
                    Sipariş ver
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <>
                    {activeStep === steps.length ? (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Siparişiniz için teşekkürler.
                            </Typography>
                            <Typography variant="subtitle1">
                                Sipariş No #{orderNumber}.
                            </Typography>
                        </>
                    ) : (
                        <form onSubmit={methods.handleSubmit(handleNext)}>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Gerİ
                                    </Button>
                                )}
                                <LoadingButton
                                    loading={loading}
                                    disabled={!methods.formState.isValid}
                                    variant="contained"
                                    type='submit'
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Sipariş Ver' : 'Sonraki'}
                                </LoadingButton>
                            </Box>
                        </form>
                    )}
                </>
            </Paper>
        </FormProvider>

    );
}