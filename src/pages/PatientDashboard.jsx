import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SpaIcon from '@mui/icons-material/Spa';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { MemoryTimeline, BreathingExercise } from '../components';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);

  // Mock user data
  const userData = {
    name: 'Alice Johnson',
    totalMemories: 24,
    recentLocations: ['Home', 'Park', "Doctor's Office"],
    familyMembers: 3,
  };

  const handleAddMemory = () => {
    navigate('/add-memory');
  };

  const handleBreathingExercise = () => {
    setShowBreathingExercise(!showBreathingExercise);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 2, mb: 4 }}>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 6,
          }}>
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 2,
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
            <span style={{ fontWeight: 400 }}> Dashboard</span>
          </Typography>

          <Typography
            variant='body1'
            color='text.secondary'
            sx={{
              mb: 5,
              textAlign: 'center',
              maxWidth: '600px',
              mx: 'auto',
            }}>
            Welcome to your personal memory companion.
          </Typography>
        </Box>

        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 4 },
              mb: 5,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${(theme) =>
                theme.palette.primary.light} 0%, ${(theme) =>
                theme.palette.primary.main} 100%)`,
              color: 'white',
            }}>
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={12} md={8}>
                <Typography variant='h4' component='h1' gutterBottom>
                  Welcome back, {userData.name}!
                </Typography>
                <Typography variant='body1' sx={{ lineHeight: 1.6 }}>
                  Today is a great day to capture new memories. You have{' '}
                  <strong>{userData.totalMemories}</strong> memories in your
                  collection.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant='contained'
                  color='secondary'
                  size='large'
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={handleAddMemory}
                  sx={{ borderRadius: 8, px: 3, py: 1.5 }}>
                  Add Memory
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 5, mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                whileHover={{ y: -5, boxShadow: 4 }}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                    py: 3,
                    px: 2,
                    height: '100%',
                  }}
                  onClick={handleAddMemory}>
                  <AddPhotoAlternateIcon
                    color='primary'
                    sx={{ fontSize: 48, mb: 2 }}
                  />
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Add Memory
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ lineHeight: 1.6 }}>
                    Record a new photo, voice, or text memory
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                whileHover={{ y: -5, boxShadow: 4 }}
                sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={handleBreathingExercise}>
                  <SpaIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>Breathing Exercise</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Take a moment to relax and breathe
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                whileHover={{ y: -5, boxShadow: 4 }}
                sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/timeline')}>
                  <TimelineIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>View Timeline</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    See all your memories in chronological order
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                whileHover={{ y: -5, boxShadow: 4 }}
                sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/settings')}>
                  <PeopleIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>Family Connections</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Manage your connected family members
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card
                component={motion.div}
                whileHover={{ y: -5, boxShadow: 4 }}
                sx={{ height: '100%', border: '2px solid #f8bbd0' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/help')}>
                  <NotificationsActiveIcon
                    color='error'
                    sx={{ fontSize: 48, mb: 1 }}
                  />
                  <Typography variant='h6'>Need Help?</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Emergency contacts, location sharing, and calming exercises
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Breathing Exercise Section (Collapsible) */}
        {showBreathingExercise && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}>
            <Paper elevation={2} sx={{ p: 3, my: 4, borderRadius: 3 }}>
              <Typography variant='h5' component='h2' gutterBottom>
                Breathing Exercise
              </Typography>
              <BreathingExercise />
            </Paper>
          </motion.div>
        )}

        {/* Recent Memories Timeline */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 4, mb: 2 }}>
            Recent Memories
          </Typography>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <MemoryTimeline />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<TimelineIcon />}
                onClick={() => navigate('/patient/dashboard/timeline')}>
                View Full Timeline
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 4, mb: 2 }}>
            Your Memory Stats
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography
                  variant='h3'
                  component='div'
                  color='primary'
                  gutterBottom>
                  {userData.totalMemories}
                </Typography>
                <Typography variant='h6' component='div'>
                  Total Memories
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Typography variant='h6' component='div' gutterBottom>
                  Recent Locations
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon color='primary' sx={{ mr: 1 }} />
                  <Typography variant='body1'>
                    {userData.recentLocations.join(', ')}
                  </Typography>
                </Box>
                <Button
                  variant='text'
                  size='small'
                  sx={{ alignSelf: 'flex-end', mt: 'auto' }}
                  onClick={() => navigate('/settings')}>
                  Manage Locations
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Typography variant='h6' component='div' gutterBottom>
                  Family Connections
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PeopleIcon color='primary' sx={{ mr: 1 }} />
                  <Typography variant='body1'>
                    {userData.familyMembers} family members connected
                  </Typography>
                </Box>
                <Button
                  variant='text'
                  size='small'
                  sx={{ alignSelf: 'flex-end', mt: 'auto' }}
                  onClick={() => navigate('/settings')}>
                  Manage Connections
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default PatientDashboard;
