import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Avatar,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    Theme,
} from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

const Login = (): ReactNode => {
    const [email, setEmail] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            console.log(values, 'VALUES')
        },
    })

    return (
        <>
            <Helmet>
                <title>REACT STARTER</title>
            </Helmet>
            <Grid
                container
                component="main"
                alignItems="center"
                justifyItems="center"
                justifyContent="center"
                textAlign="center"
                sx={{
                    height: '100vh',
                    p: (theme: Theme) => theme.spacing(2),
                }}
            >
                <Grid item xs={12} sm={6} md={5} lg={3}>
                    <Typography component="h1" variant="h5">
                        Sign in - WELCOME TO STARTER KIT REACT x TYPESCRIPT x
                        MUI
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            error={!!formik.errors.email}
                            helperText={formik.errors.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            onChange={(event) => {
                                formik.values.email = event.target.value
                                setEmail(event.target.value)
                            }}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            error={!!formik.errors.password}
                            helperText={formik.errors.password}
                            margin="normal"
                            required
                            fullWidth
                            onChange={(event) => {
                                formik.values.password = event.target.value
                            }}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Box textAlign="start">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                        </Box>
                        <LoadingButton
                            loadingPosition="end"
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={formik.isSubmitting}
                            disabled={formik.isSubmitting}
                            fullWidth
                        >
                            {formik.isSubmitting
                                ? 'Attempting Sign In'
                                : 'Sign In'}
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Login
