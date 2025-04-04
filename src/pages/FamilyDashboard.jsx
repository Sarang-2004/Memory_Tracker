import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './server';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Container,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoodIcon from '@mui/icons-material/Mood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useAuth } from '../contexts/AuthContext';
import { MemoryCarousel } from '../components';
import { alpha } from '@mui/material/styles';
import catImage from '../assets/cat.jpg';
import { useMemory } from '../contexts/MemoryContext';

const FamilyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshTrigger } = useMemory();
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        if (!user?.patient_id) {
          throw new Error("No patient connected");
        }

        // First, get all family members connected to this patient
        const { data: familyMembers, error: familyError } = await supabase
          .from('family_members')
          .select('id')
          .eq('patient_id', user.patient_id);

        if (familyError) throw familyError;

        // Create an array of user IDs (patient + family members)
        const userIds = [user.patient_id, ...(familyMembers?.map(fm => fm.id) || [])];

        // Fetch memories created by either the patient or their family members
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .in('user_id', userIds)
          .order('date', { ascending: false });

        if (error) throw error;

        setMemories(data || []);
      } catch (error) {
        console.error('Error fetching memories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, [user, refreshTrigger]);

  // Create a combined userData object with defaults and auth data
  const userData = {
    name: user?.name || 'Family Member',
    email: user?.email || '',
    patientName: user?.patient_name || 'Patient',
    patientId: user?.patient_id || '',
    relation: user?.relationship || 'Family Member',
    memories: memories,
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
            <Grid
              container
              spacing={3}
              alignItems='center'
              sx={{ position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={8}>
                <Typography variant='h4' component='h1' gutterBottom>
                  Welcome back, {userData.name}
                </Typography>
                <Typography variant='subtitle1' sx={{ mb: 3, opacity: 0.9 }}>
                  You're managing memories for {userData.patientName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant='contained'
                    startIcon={<AddPhotoAlternateIcon />}
                    onClick={() => navigate('/add-memory')}
                    sx={{
                      bgcolor: 'white',
                      color: 'secondary.main',
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
                    startIcon={<CalendarTodayOutlinedIcon />}
                    component={Link}
                    to='/family/dashboard/timeline'
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
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                    }}>
                    <Typography variant='body2' sx={{ fontWeight: 500 }}>
                      {userData.patientName}'s Memories
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1, fontWeight: 700 }}>
                      {memories.length}
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Memory Carousel */}
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
                {userData.patientName}'s Memories
              </Typography>
              <MemoryCarousel memories={memories} loading={loading} />
            </Box>
          </motion.div>
        </Grid>

        {/* Recent Memories */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              },
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}>
              <Typography variant='h5' component='h2'>
                Recent Memories
              </Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                component={Link}
                to='/family/dashboard/timeline'
                sx={{ borderRadius: 2 }}>
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {memories.slice(0, 3).map((memory) => (
                <Grid item xs={12} key={memory.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}>
                    <CardContent>
                      <Typography
                        variant='h6'
                        component='div'
                        gutterBottom
                        noWrap>
                        {memory.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 1 }}>
                        {new Date(memory.date).toLocaleDateString()}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Chip
                          size='small'
                          label={memory.location}
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FamilyDashboard;
