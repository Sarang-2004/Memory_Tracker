import { useState } from 'react';
import { supabase } from "./server.js";
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
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../contexts/AuthContext';

const PatientLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      // Step 1: Authenticate user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (authError) {
        setError('Invalid email or password');
        return;
      }
  
      // Step 2: Fetch additional user details from 'patients' table
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('*')
        .eq('id', authData.user.id) // Fetch data using authenticated user ID
        .single();
  
      if (patientError) {
        setError('Error fetching patient data');
        return;
      }
  
      console.log('Patient authenticated:', patientData);
  
      // Step 3: Store authenticated user data in context/state
      const userData = {
        name: patientData.name,
        email: patientData.email,
        mobile: patientData.mobile,
        familyMembers: [
          { id: 1, name: 'Sarah Thompson', relation: 'Daughter' },
          { id: 2, name: 'Mark Johnson', relation: 'Son' },
        ],
        memories: [
          {
            id: 1,
            title: 'Beach Day',
            description: 'A wonderful day at Malibu Beach with family',
            date: 'June 15, 2023',
            imageUrl: 'https://source.unsplash.com/random/800x600/?beach',
            location: 'Malibu, CA',
            tags: ['family', 'beach', 'summer'],
            reactions: 5,
          },
          {
            id: 2,
            title: 'Birthday Celebration',
            description: 'My 65th birthday with all the grandchildren',
            date: 'May 2, 2023',
            imageUrl: 'https://source.unsplash.com/random/800x600/?birthday',
            location: 'Home',
            tags: ['birthday', 'family', 'celebration'],
            reactions: 8,
          },
          {
            id: 3,
            title: 'Garden Visit',
            description: 'Visiting the Botanical Gardens on a sunny day',
            date: 'April 10, 2023',
            imageUrl: 'https://source.unsplash.com/random/800x600/?garden',
            location: 'Botanical Gardens',
            tags: ['nature', 'garden', 'spring'],
            reactions: 3,
          },
        ],
      };
  
      login('patient', userData); // Store user session
      navigate('/patient/dashboard'); // Redirect after login
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
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
                <AccessibilityNewIcon
                  color='primary'
                  sx={{ fontSize: 60, mb: 2 }}
                />
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
                Welcome back! Please log in to access your memories.
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
                  to='/patient/register'
                  color='secondary'
                  sx={{ fontWeight: 'bold' }}>
                  Create Account
                </Button>
              </Typography>
            </Box>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant='body2' color='text.secondary'>
              Are you a family member?{' '}
              <Button
                component={Link}
                to='/family/login'
                color='primary'
                sx={{ fontWeight: 'bold' }}>
                Family Login
              </Button>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PatientLogin;
