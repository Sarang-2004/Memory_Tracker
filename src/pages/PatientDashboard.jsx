import { useState, useEffect } from 'react';
import { supabase } from './server';
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
  useTheme,
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
import { alpha } from '@mui/material/styles';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import catImage from '../assets/cat.jpg';
import { useMemory } from '../contexts/MemoryContext';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // Create a combined userData object with defaults and auth data
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentLocations, setRecentLocations] = useState([]);
  const { refreshTrigger } = useMemory();

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        // Get the current user's ID
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          throw new Error("User not authenticated");
        }

        // First, get all family members connected to this patient
        const { data: familyMembers, error: familyError } = await supabase
          .from('family_members')
          .select('id')
          .eq('patient_id', user.id);

        if (familyError) throw familyError;

        // Create an array of user IDs (patient + family members)
        const userIds = [user.id, ...(familyMembers?.map(fm => fm.id) || [])];

        // Fetch memories created by either the patient or their family members
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .in('user_id', userIds)
          .order('date', { ascending: false });

        if (error) throw error;

        setMemories(data || []);

        // Get unique locations, keeping only the most recent occurrence of each
        const uniqueLocations = data
          .filter(memory => memory.location && memory.location.trim() !== '')
          .reduce((acc, memory) => {
            if (!acc.includes(memory.location)) {
              acc.push(memory.location);
            }
            return acc;
          }, [])
          .slice(0, 3); // Take only the first 3 unique locations

        setRecentLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching memories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, [refreshTrigger]);

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

  const userData = {
    name: user?.name || 'Guest', // Default name if undefined
    email: user?.email || '',
    familyMembers: user?.familyMembers || [], // Add default empty array for familyMembers
  };

  return (
    <Container maxWidth='lg' sx={{ mt: { xs: 2, md: 4 }, mb: 6 }}>
      <Box sx={{ maxWidth: '100%', margin: '0 auto' }}>
        <Grid container spacing={4}>
          {/* Greeting Card */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              variants={itemVariants}>
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 5,
                  borderRadius: 3,
                  background: isDarkMode
                    ? `linear-gradient(90deg, ${alpha(
                        theme.palette.primary.dark,
                        0.8
                      )} 0%, ${alpha(theme.palette.primary.main, 0.6)} 100%)`
                    : `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: '#fff',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: isDarkMode
                    ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.15)',
                  width: '100%',
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
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: '#fff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}>
                      {greeting} {userData?.name}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        mb: 3,
                        opacity: 1,
                        maxWidth: '600px',
                        color: '#fff',
                        fontWeight: 500,
                      }}>
                      Welcome to your personal memory dashboard. Explore your
                      memories, add new ones, or take a moment to relax with
                      breathing exercises.
                    </Typography>
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
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          p: 2,
                          borderRadius: 3,
                          width: { xs: '50%', sm: '140px' },
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}>
                        <Typography
                          variant='h4'
                          sx={{ fontWeight: 700, color: '#fff' }}>
                          {userData?.familyMembers.length}
                        </Typography>
                        <Typography variant='body2' sx={{ color: '#fff' }}>
                          Family Members
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Featured Memories Carousel with Action Buttons */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}>
              <Box sx={{ mb: 5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    mx: 1,
                  }}>
                  <Typography variant='h5' sx={{ fontWeight: 600 }}>
                    Featured Memories
                  </Typography>
                </Box>
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: isDarkMode
                      ? '0 10px 30px rgba(0, 0, 0, 0.3)'
                      : '0 10px 30px rgba(0, 0, 0, 0.15)',
                    width: '100%',
                    height: { xs: 380, sm: 450, md: 500 },
                  }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      zIndex: 10,
                      display: 'flex',
                      gap: 2,
                    }}>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<AddPhotoAlternateIcon />}
                      onClick={handleAddMemory}
                      size='medium'
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        bgcolor: 'primary.main',
                      }}>
                      Add Memory
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<TimelineIcon />}
                      component={Link}
                      to='/patient/dashboard/timeline'
                      size='medium'
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.8)',
                        color: 'primary.main',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        '&:hover': {
                          bgcolor: 'white',
                        },
                      }}>
                      View Timeline
                    </Button>
                  </Box>
                  <MemoryCarousel memories={memories} />
                </Paper>
              </Box>
            </motion.div>
          </Grid>

          {/* Three action cards in the same row */}
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {/* Recent Locations */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  variants={itemVariants}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: '100%',
                      bgcolor: (theme) => theme.palette.background.paper,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDarkMode
                          ? '0 12px 20px rgba(0, 0, 0, 0.3)'
                          : '0 12px 20px rgba(0, 0, 0, 0.1)',
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
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                        }}>
                        <LocationOnIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    {recentLocations.length > 0 ? (
                    <Stack spacing={2}>
                        {recentLocations.map((location, index) => (
                          <Box
                            key={index}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              gap: 1,
                              p: 1,
                              borderRadius: 1,
                              '&:hover': {
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                              },
                            }}>
                              <LocationOnIcon color="primary" sx={{ fontSize: 20 }} />
                              <Typography variant="body1">{location}</Typography>
                            </Box>
                      ))}
                    </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No recent locations found
                      </Typography>
                    )}
                  </Paper>
                </motion.div>
              </Grid>

              {/* Family Members */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  variants={itemVariants}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: '100%',
                      bgcolor: (theme) => theme.palette.background.paper,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDarkMode
                          ? '0 12px 20px rgba(0, 0, 0, 0.3)'
                          : '0 12px 20px rgba(0, 0, 0, 0.1)',
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
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                        }}>
                        <PeopleIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                    <Stack spacing={2}>
                      {userData?.familyMembers.map((member) => (
                        <Card
                          key={member.name}
                          variant='outlined'
                          sx={{
                            borderRadius: 2,
                            boxShadow: 'none',
                            bgcolor: (theme) => theme.palette.background.paper,
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
                              <Box
                                sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    mr: 1,
                                    bgcolor: (theme) =>
                                      theme.palette.primary.main,
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

              {/* Quick Actions */}
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  variants={itemVariants}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: '100%',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      bgcolor: (theme) => theme.palette.background.paper,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: isDarkMode
                          ? '0 12px 20px rgba(0, 0, 0, 0.3)'
                          : '0 12px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                      }}>
                      <Typography variant='h6'>Quick Actions</Typography>
                      <IconButton
                        color='primary'
                        size='small'
                        sx={{
                          bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                        }}>
                        <AddPhotoAlternateIcon />
                      </IconButton>
                    </Box>
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
            </Grid>
          </Grid>

          {/* Recent Memories */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={itemVariants}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDarkMode
                      ? '0 12px 20px rgba(0, 0, 0, 0.3)'
                      : '0 12px 20px rgba(0, 0, 0, 0.1)',
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
                  {memories?.length > 0 ? (
                    memories.slice(0, 3).map((memory) => (
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
                                `0 8px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
                            },
                          }}
                          onClick={() => handleViewMemory(memory.id)}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={memory.content || catImage}
                            alt={memory.title || "Memory"}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="div" gutterBottom>
                              {memory.title || "Untitled Memory"}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <CalendarTodayOutlinedIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                              {memory.date || "Unknown Date"}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {memory.description || "No description available."}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    // **This part was missing in your code**
                    <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
                      No memories found.
                    </Typography>
                  )}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PatientDashboard;
