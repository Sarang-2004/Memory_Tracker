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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TimelineIcon from '@mui/icons-material/Timeline';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { MemoryTimeline, GroupCodeDisplay } from '../components';

const FamilyDashboard = () => {
  const navigate = useNavigate();
  const [showGroupCode, setShowGroupCode] = useState(false);

  // Mock user data
  const userData = {
    name: 'John Smith',
    relation: 'Son',
    patientName: 'Alice Johnson',
    lastActive: '2 hours ago',
    totalMemories: 24,
    recentActivity: [
      {
        id: 1,
        type: 'memory_added',
        title: 'Added a new photo memory',
        time: '3 days ago',
      },
      {
        id: 2,
        type: 'voice_recorded',
        title: 'Recorded a voice memory',
        time: '1 week ago',
      },
      {
        id: 3,
        type: 'location_visited',
        title: 'Visited the park',
        time: '2 weeks ago',
      },
    ],
  };

  const handleAddMemory = () => {
    navigate('/add-memory');
  };

  const handleToggleGroupCode = () => {
    setShowGroupCode(!showGroupCode);
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
            <span style={{ fontWeight: 400 }}> Family View</span>
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
            Stay connected and contribute to your loved one's memory collection.
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
                  Welcome, {userData.name}!
                </Typography>
                <Typography variant='body1' sx={{ lineHeight: 1.6 }}>
                  You're connected to {userData.patientName}'s memory collection
                  as their {userData.relation}. They were last active{' '}
                  {userData.lastActive}.
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
                sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={handleAddMemory}>
                  <AddPhotoAlternateIcon
                    color='primary'
                    sx={{ fontSize: 48, mb: 1 }}
                  />
                  <Typography variant='h6'>Add Memory</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Contribute a new memory to the collection
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
                  onClick={() => navigate('/family/dashboard/timeline')}>
                  <TimelineIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>View Timeline</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Browse all memories in chronological order
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
                  onClick={handleToggleGroupCode}>
                  <PeopleIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>Invite Family</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Share access code with other family members
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
                  onClick={() => navigate('/help')}>
                  <MessageIcon color='primary' sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant='h6'>Support Resources</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Access caregiver resources and support
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Group Code Section (Collapsible) */}
        {showGroupCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}>
            <Paper elevation={2} sx={{ p: 3, my: 4, borderRadius: 3 }}>
              <Typography variant='h5' component='h2' gutterBottom>
                Family Access Code
              </Typography>
              <Typography variant='body2' paragraph>
                Share this code with other family members so they can connect to{' '}
                {userData.patientName}'s memory collection.
              </Typography>
              <GroupCodeDisplay />
            </Paper>
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 4, mb: 2 }}>
            Recent Activity
          </Typography>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <List>
              {userData.recentActivity.map((activity) => (
                <ListItem key={activity.id} alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.title}
                    secondary={
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.secondary'>
                        {activity.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </motion.div>

        {/* Shared Memories Timeline */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 4, mb: 2 }}>
            Shared Memories
          </Typography>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <MemoryTimeline />
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<TimelineIcon />}
                onClick={() => navigate('/family/dashboard/timeline')}>
                View Full Timeline
              </Button>
            </Box>
          </Paper>
        </motion.div>

        {/* Patient Status */}
        <motion.div variants={itemVariants}>
          <Typography
            variant='h5'
            component='h2'
            gutterBottom
            sx={{ mt: 4, mb: 2 }}>
            Patient Status
          </Typography>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 2, md: 0 },
              }}>
              <Avatar
                sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}>
                <PersonIcon fontSize='large' />
              </Avatar>
              <Box>
                <Typography variant='h6'>{userData.patientName}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Last active: {userData.lastActive}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='outlined'
                startIcon={<MessageIcon />}
                onClick={() => navigate('/help')}>
                Support Resources
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<NotificationsIcon />}
                onClick={() => navigate('/settings')}>
                Notification Settings
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default FamilyDashboard;
