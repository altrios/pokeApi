import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Card, Typography, CssBaseline, Avatar, Box, CardContent, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/pokelist/register', data);
            setUsername(response.data.user);
            setOpenSuccessSnackbar(true);
            setTimeout(() => {
                navigate('/'); // Puedes redirigir a otra página después del registro exitoso
            }, 3000);
        } catch (error) {
            console.error('Registration failed!', error.message);
        }
    };

    const handleCloseSuccessSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessSnackbar(false);
    };

    return (
        <div>
            <Box className='centered-box'>
                <Card className='grid-item' style={{ maxWidth: '600px', minHeight: '500px', borderRadius: '16px' }}>
                    <CardContent className='text-center'>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            label="Username"
                                            autoComplete="username"
                                            error={!!errors.username}
                                            helperText={errors.username ? errors.username.message : ''}
                                        />
                                    )}
                                    rules={{ required: 'Username is required' }}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            variant="outlined"
                                            margin="normal"
                                            label="Password"
                                            type="password"
                                            autoComplete="new-password"
                                            error={!!errors.password}
                                            helperText={errors.password ? errors.password.message : ''}
                                        />
                                    )}
                                    rules={{ required: 'Password is required' }}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        mt: 2,
                                    }}>

                                    <Button type="submit" maxWidth='150px' variant="contained" sx={{ mt: 3, mb: 2 }} >
                                        Sign up
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        type="submit"
                                        maxWidth='150px'
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }} >
                                        Sign in
                                    </Button>
                                </Box>
                            </Box>
                            <Snackbar
                                open={openSuccessSnackbar}
                                autoHideDuration={3000}
                                onClose={handleCloseSuccessSnackbar}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%' }}>
                                    Hi {username}! Registration successful!
                                </Alert>
                            </Snackbar>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default Register;
