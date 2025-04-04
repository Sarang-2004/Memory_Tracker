import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Divider,
  IconButton,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  Avatar,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SecurityIcon from '@mui/icons-material/Security';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AccessibilityControls, EmergencyContact } from '../components';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from './server';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Get theme from context
  const { mode, toggleTheme } = useTheme();
  
  // User data state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    fontSize: 16,
    highContrast: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // Get the current user's ID
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        if (userError || !authUser) {
          throw new Error("User not authenticated");
        }

        // Fetch user data based on user type
        let tableName = user?.type === 'patient' ? 'patients' : 'family_members';
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (error) throw error;

        if (data) {
          setUserData(prev => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            phone: data.mobile || '',
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setNotification({
          open: true,
          message: 'Error loading user data',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user?.type]);

  const handleBack = () => {
    navigate(-1);
  };
    
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setUserData({ ...userData, [name]: checked });
  };

  const handleFontSizeChange = (event, newValue) => {
    setUserData({ ...userData, fontSize: newValue });
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // Get the current user's ID
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
      if (userError || !authUser) {
        throw new Error("User not authenticated");
      }

      // Update user data based on user type
      let tableName = user?.type === 'patient' ? 'patients' : 'family_members';
    const { error } = await supabase
        .from(tableName)
      .update({
        name: userData.name,
        email: userData.email,
        mobile: userData.phone,
      })
        .eq('id', authUser.id);

      if (error) throw error;

      setNotification({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setNotification({
        open: true,
        message: 'Error updating profile',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setNotification({ ...notification, open: false });
      }, 3000);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 2, mb: 4 }}>
      <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant='h4' component='h1'>
            Settings
          </Typography>
      </Box>

        {notification.open && (
          <Alert severity={notification.severity} sx={{ mb: 3 }}>
            {notification.message}
          </Alert>
        )}

        <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant='fullWidth'
            sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab icon={<PersonIcon />} label='Profile' iconPosition='start' />
            <Tab
              icon={<AccessibilityNewIcon />}
              label='Accessibility'
              iconPosition='start'
            />
            <Tab
              icon={<PeopleIcon />}
              label='Family Connections'
              iconPosition='start'
            />
          </Tabs>

          {/* Profile Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                    alt={userData.name}
                    src='/placeholder-avatar.jpg'>
                    {userData.name.charAt(0)}
                  </Avatar>
                  <Button variant='outlined' color='primary'>
                    Change Photo
                  </Button>
          </Grid>
          <Grid item xs={12} md={8}>
                  <Typography variant='h6' gutterBottom>
                    Personal Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Full Name'
                        name='name'
                        value={userData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Email Address'
                        name='email'
                        type='email'
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Phone Number'
                        name='phone'
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleSaveProfile}
                      disabled={loading}>
                      {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Accessibility Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant='h6' gutterBottom>
                Display Settings
              </Typography>

              {/* Theme Toggle */}
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={mode === 'dark'}
                      onChange={toggleTheme}
                      color='primary'
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {mode === 'dark' ? (
                        <>
                          <DarkModeIcon color='primary' />
                          <Typography>Dark Mode</Typography>
                        </>
                      ) : (
                        <>
                          <LightModeIcon color='primary' />
                          <Typography>Light Mode</Typography>
                        </>
                      )}
                    </Box>
                  }
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 4 }}>
                <Typography id='font-size-slider' gutterBottom>
                  Font Size: {userData.fontSize}px
                </Typography>
                <Slider
                  value={userData.fontSize}
                  onChange={handleFontSizeChange}
                  aria-labelledby='font-size-slider'
                  valueLabelDisplay='auto'
                  step={1}
                  marks
                  min={12}
                  max={24}
                />
              </Box>
            </Box>
          )}

          {/* Family Connections Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant='h6' gutterBottom>
                Family Members & Caregivers
              </Typography>
              <Typography variant='body2' paragraph color='text.secondary'>
                Manage your connected family members and caregivers who can
                access your memories and help you.
              </Typography>
              <EmergencyContact />
            </Box>
          )}
        </Paper>

        <Paper elevation={2} sx={{ mt: 4, p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon color='primary' sx={{ mr: 2 }} />
            <Typography variant='h6'>Account Security</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant='outlined' fullWidth>
                Change Password
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant='outlined' color='error' fullWidth>
                Delete Account
              </Button>
            </Grid>
        </Grid>
      </Paper>
      </div>
    </Container>
  );
};

export default Settings;
