import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Grid,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FamilyLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, we would authenticate with a backend
    // For demo purposes, we'll just navigate to the dashboard
    navigate('/family/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}>
      <Container maxWidth='sm'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <Button
            component={Link}
            to='/'
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 4 }}>
            Back to Home
          </Button>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 3,
              }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                <PeopleIcon color='primary' sx={{ fontSize: 60, mb: 2 }} />
              </motion.div>
              <Typography
                variant='h4'
                component='h1'
                gutterBottom
                sx={{
                  mb: 3,
                  textAlign: 'center',
                }}>
                <span
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 800,
                  }}>
                  Memo
                </span>
                <span
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                  }}>
                  Bloom
                </span>
              </Typography>
              <Typography
                variant='body1'
                color='text.secondary'
                align='center'
                sx={{ mb: 4, maxWidth: '400px', mx: 'auto' }}>
                Welcome back! Please log in to access your family member's
                memories.
              </Typography>
            </Box>

            {error && (
              <Alert severity='error' sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                margin='normal'
                variant='outlined'
                required
                InputProps={{
                  sx: { borderRadius: 2, fontSize: '1.1rem' },
                }}
              />

              <TextField
                fullWidth
                label='Password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                margin='normal'
                variant='outlined'
                required
                InputProps={{
                  sx: { borderRadius: 2, fontSize: '1.1rem' },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleTogglePassword}
                        edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                size='large'
                sx={{ py: 1.5, borderRadius: 2, fontSize: '1.1rem', mb: 2 }}>
                Log In
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Forgot your password?{' '}
                  <Link
                    to='/forgot-password'
                    style={{ color: 'inherit', fontWeight: 'bold' }}>
                    Reset it here
                  </Link>
                </Typography>
              </Box>
            </form>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='body2' color='text.secondary'>
                Don't have an account?{' '}
                <Button
                  component={Link}
                  to='/family/register'
                  color='secondary'
                  sx={{ fontWeight: 'bold' }}>
                  Create Account
                </Button>
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
              }}>
              <Typography variant='body2' color='text.secondary' align='center'>
                <strong>Note:</strong> You need an invitation code from a
                patient to connect to their account. If you don't have a code,
                please ask your family member to share it with you.
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant='body2' color='text.secondary'>
              Are you a patient?{' '}
              <Button
                component={Link}
                to='/patient/login'
                color='primary'
                sx={{ fontWeight: 'bold' }}>
                Patient Login
              </Button>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FamilyLogin;
