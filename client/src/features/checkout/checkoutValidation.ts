import * as yup from 'yup';

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('<İsim ve soyisim gerekli>'),
        address1: yup.string().required('Adres gerekli'),
        address2: yup.string(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required(),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })
]