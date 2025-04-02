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
  Stack,
  Avatar,
  CardMedia,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SpaIcon from '@mui/icons-material/Spa';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {
  MemoryTimeline,
  BreathingExercise,
  MemoryCarousel,
} from '../components';
import { Link } from 'react-router-dom';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { useAuth } from '../contexts/AuthContext';
import { styled, alpha } from '@mui/material/styles';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import catImage from '../assets/cat.jpg';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const { user } = useAuth();

  // Create a combined userData object with defaults and auth data
  const userData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    familyMembers: user?.familyMembers || [
      { name: 'Mary (Daughter)', avatar: null },
      { name: 'Robert (Son)', avatar: null },
      { name: 'Emily (Granddaughter)', avatar: null },
    ],
    ...user, // Include any other properties from auth
  };

  // Sample memories for demonstration
  const memories = [
    {
      id: 1,
      title: 'Beach Day',
      description: 'A wonderful day at Malibu Beach with family',
      date: 'June 15, 2023',
      content: catImage,
      location: 'Malibu, CA',
      tags: ['family', 'beach', 'summer'],
      type: 'photo',
    },
    {
      id: 2,
      title: 'Birthday Celebration',
      description: 'My 65th birthday with all the grandchildren',
      date: 'May 2, 2023',
      content: catImage,
      location: 'Home',
      tags: ['birthday', 'family', 'celebration'],
      type: 'photo',
    },
    {
      id: 3,
      title: 'Garden Visit',
      description: 'Visiting the Botanical Gardens on a sunny day',
      date: 'April 10, 2023',
      content: catImage,
      location: 'Botanical Gardens',
      tags: ['nature', 'garden', 'spring'],
      type: 'photo',
    },
    {
      id: 4,
      title: 'My Favorite Recipe',
      description: 'The apple pie recipe that I learned from my mother',
      date: 'March 20, 2023',
      content:
        'This apple pie recipe has been in our family for generations. I remember my mother teaching me how to make the perfect crust when I was just a little girl.',
      location: 'Home Kitchen',
      tags: ['recipe', 'food', 'memory'],
      type: 'text',
    },
    {
      id: 5,
      title: 'Story About My Childhood',
      description: 'A recording of me talking about growing up on the farm',
      date: 'February 15, 2023',
      content: 'audio-recording.mp3',
      location: 'Living Room',
      tags: ['story', 'childhood', 'history'],
      type: 'voice',
    },
  ];

  const handleAddMemory = () => {
    navigate('/add-memory');
  };

  const handleViewMemory = (id) => {
    navigate(`/memory/${id}`);
  };

  const toggleBreathingExercise = () => {
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

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  return (
    <Container maxWidth='lg' sx={{ mt: { xs: 2, md: 4 }, mb: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
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
                overflow: 'hidden',
                position: 'relative',
              }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -40,
                  left: -40,
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  zIndex: 0,
                }}
              />
              <Grid
                container
                spacing={3}
                alignItems='center'
                sx={{ position: 'relative', zIndex: 1 }}>
                <Grid item xs={12} md={7}>
                  <Typography
                    variant='h4'
                    component='h1'
                    gutterBottom
                    sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {getGreetingMessage()} {userData.name}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 3, opacity: 0.9, maxWidth: '600px' }}>
                    Welcome to your personal memory dashboard. Explore your
                    memories, add new ones, or take a moment to relax with
                    breathing exercises.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant='contained'
                      color='secondary'
                      startIcon={<AddPhotoAlternateIcon />}
                      onClick={handleAddMemory}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                      }}>
                      Add Memory
                    </Button>
                    <Button
                      variant='outlined'
                      color='inherit'
                      startIcon={<TimelineIcon />}
                      component={Link}
                      to='/patient/dashboard/timeline'
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                      }}>
                      View Timeline
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      mt: { xs: 3, md: 0 },
                    }}>
                    <Box
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        p: 2,
                        borderRadius: 3,
                        width: { xs: '50%', sm: '140px' },
                      }}>
                      <Typography variant='h4' sx={{ fontWeight: 700 }}>
                        {userData.familyMembers.length}
                      </Typography>
                      <Typography variant='body2'>Family Members</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Grid>

        {/* Featured Memories Carousel - Shows all memory types */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant='h5'
                gutterBottom
                sx={{ ml: 1, fontWeight: 600 }}>
                Featured Memories
              </Typography>
              <MemoryCarousel memories={memories} />
            </Box>
          </motion.div>
        </Grid>

        {/* Actions Section */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                },
              }}>
              <Typography variant='h6' gutterBottom>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2}>
                <Button
                  variant='outlined'
                  color='primary'
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={handleAddMemory}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 2,
                  }}>
                  Create New Memory
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  startIcon={<SpaIcon />}
                  onClick={toggleBreathingExercise}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 2,
                  }}>
                  Breathing Exercise
                </Button>
                <Button
                  variant='outlined'
                  color='info'
                  startIcon={<FamilyRestroomIcon />}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    borderRadius: 2,
                  }}>
                  Family Connections
                </Button>
              </Stack>
              {showBreathingExercise && (
                <Box sx={{ mt: 3 }}>
                  <BreathingExercise />
                </Box>
              )}
            </Paper>
          </motion.div>
        </Grid>

        {/* Recent Locations */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                },
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}>
                <Typography variant='h6'>Recent Locations</Typography>
                <IconButton
                  color='primary'
                  size='small'
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }}>
                  <LocationOnIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2}>
                {userData.familyMembers.map((member) => (
                  <Card
                    key={member.name}
                    variant='outlined'
                    sx={{
                      borderRadius: 2,
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                      },
                    }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              mr: 1,
                              bgcolor: (theme) => theme.palette.primary.main,
                              fontSize: '0.875rem',
                            }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant='body1'>
                              {member.name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton size='small'>
                          <ArrowForwardIcon fontSize='small' />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* Family Members */}
        <Grid item xs={12} md={4}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                },
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}>
                <Typography variant='h6'>Family Members</Typography>
                <IconButton
                  color='primary'
                  size='small'
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  }}>
                  <PeopleIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Stack spacing={2}>
                {userData.familyMembers.map((member) => (
                  <Card
                    key={member.name}
                    variant='outlined'
                    sx={{
                      borderRadius: 2,
                      boxShadow: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.05),
                      },
                    }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              mr: 1,
                              bgcolor: (theme) => theme.palette.primary.main,
                              fontSize: '0.875rem',
                            }}>
                            {member.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant='body1'>
                              {member.name}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton size='small'>
                          <ArrowForwardIcon fontSize='small' />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
                <Button
                  variant='text'
                  size='small'
                  sx={{ alignSelf: 'center', mt: 1 }}>
                  Manage Family
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* Recent Memories */}
        <Grid item xs={12}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                },
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                }}>
                <Typography variant='h6'>Recent Memories</Typography>
                <Button
                  variant='outlined'
                  size='small'
                  endIcon={<ArrowForwardIcon />}
                  component={Link}
                  to='/patient/dashboard/timeline'
                  sx={{ borderRadius: 2 }}>
                  View All
                </Button>
              </Box>
              <Grid container spacing={3}>
                {memories.slice(0, 3).map((memory) => (
                  <Grid item xs={12} sm={6} md={4} key={memory.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: (theme) =>
                            `0 8px 16px ${alpha(
                              theme.palette.primary.main,
                              0.15
                            )}`,
                        },
                      }}
                      onClick={() => handleViewMemory(memory.id)}>
                      <CardMedia
                        component='img'
                        height='140'
                        image={memory.content}
                        alt={memory.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant='h6' component='div' gutterBottom>
                          {memory.title}
                        </Typography>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <CalendarTodayOutlinedIcon
                            fontSize='inherit'
                            sx={{ mr: 0.5 }}
                          />
                          {memory.date}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}>
                          {memory.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard;
