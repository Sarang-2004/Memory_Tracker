import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Chip,
  IconButton,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// Sample placeholder images for testing
const placeholderImages = [
  'https://source.unsplash.com/random/800x600/?family',
  'https://source.unsplash.com/random/800x600/?elderly',
  'https://source.unsplash.com/random/800x600/?memory',
  'https://source.unsplash.com/random/800x600/?nature',
];

// Sample memory data
const sampleMemories = [
  {
    id: '1',
    title: 'Family Picnic',
    date: '2023-06-15',
    type: 'photo',
    content: placeholderImages[0],
    description:
      'A wonderful day at the park with the whole family. We had sandwiches and played frisbee.',
    location: 'Central Park',
    people: ['Mom', 'Dad', 'Sister'],
    filter: 'polaroid',
  },
  {
    id: '2',
    title: 'Birthday Celebration',
    date: '2023-05-20',
    type: 'voice',
    content: 'audio-file-url.mp3',
    description:
      'Recording of everyone singing happy birthday and sharing stories.',
    location: 'Home',
    people: ['Grandchildren', 'Children'],
    filter: 'none',
  },
  {
    id: '3',
    title: 'My Favorite Recipe',
    date: '2023-04-10',
    type: 'text',
    content:
      'This apple pie recipe has been in our family for generations. I remember my mother teaching me how to make the perfect crust when I was just a little girl.',
    description: "Grandma's special apple pie recipe that everyone loves.",
    location: 'Kitchen',
    people: [],
    filter: 'none',
  },
];

const MemoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, we would fetch the memory from an API
    // For demo purposes, we'll use the sample data
    const foundMemory = sampleMemories.find((m) => m.id === id);
    if (foundMemory) {
      setMemory(foundMemory);
    } else {
      setError('Memory not found');
    }
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    // In a real app, we would navigate to an edit page
    console.log('Edit memory:', id);
  };

  const handleDelete = () => {
    // In a real app, we would show a confirmation dialog and delete the memory
    console.log('Delete memory:', id);
    navigate(-1);
  };

  const handleShare = () => {
    // In a real app, we would show sharing options
    console.log('Share memory:', id);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, we would play/pause the audio
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Apply different styles based on the filter type
  const getFilterStyle = (filter) => {
    switch (filter) {
      case 'polaroid':
        return {
          border: '15px solid white',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transform: 'rotate(-2deg)',
          mb: 2,
        };
      case 'sepia':
        return {
          filter: 'sepia(100%)',
          border: '5px solid #d4b483',
          mb: 2,
        };
      case 'vintage':
        return {
          filter: 'grayscale(50%)',
          border: '8px solid #f5f5f5',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          mb: 2,
        };
      default:
        return { mb: 2 };
    }
  };

  // Render different content based on memory type
  const renderMemoryContent = () => {
    if (!memory) return null;

    switch (memory.type) {
      case 'photo':
        return (
          <Box sx={{ mb: 4 }}>
            <CardMedia
              component='img'
              image={memory.content}
              alt={memory.title}
              sx={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: 2,
                ...getFilterStyle(memory.filter),
              }}
            />
          </Box>
        );
      case 'voice':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 3,
              mb: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}>
            <Typography variant='h6' gutterBottom>
              Voice Recording
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                my: 2,
              }}>
              <IconButton
                color='primary'
                size='large'
                onClick={handleTogglePlay}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  mx: 2,
                }}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <Box
                sx={{
                  height: '40px',
                  flexGrow: 1,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: isPlaying ? '60%' : '0%',
                    bgcolor: 'primary.light',
                    transition: 'width 0.3s linear',
                  }}
                />
              </Box>
            </Box>
            <Typography variant='body2' color='text.secondary'>
              {isPlaying ? 'Playing...' : 'Click play to listen'}
            </Typography>
          </Box>
        );
      case 'text':
        return (
          <Box
            sx={{
              p: 3,
              mb: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              fontStyle: 'italic',
              lineHeight: 1.8,
            }}>
            <Typography variant='body1' paragraph>
              {memory.content}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
        <Typography color='error'>{error}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!memory) {
    return (
      <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
        <Typography>Memory not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 2, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant='h4' component='h1'>
            Memory Details
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h4' component='h2' gutterBottom>
              {memory.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mb: 2,
              }}>
              <Chip
                icon={<CalendarTodayIcon />}
                label={formatDate(memory.date)}
                variant='outlined'
              />
              {memory.location && (
                <Chip
                  icon={<LocationOnIcon />}
                  label={memory.location}
                  variant='outlined'
                />
              )}
              {memory.people && memory.people.length > 0 && (
                <Chip
                  icon={<PeopleIcon />}
                  label={`${memory.people.length} ${
                    memory.people.length === 1 ? 'person' : 'people'
                  }`}
                  variant='outlined'
                />
              )}
            </Box>
          </Box>

          {renderMemoryContent()}

          {memory.description && (
            <Box sx={{ mb: 4 }}>
              <Typography variant='h6' gutterBottom>
                Description
              </Typography>
              <Typography variant='body1' paragraph>
                {memory.description}
              </Typography>
            </Box>
          )}

          {memory.people && memory.people.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant='h6' gutterBottom>
                People
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {memory.people.map((person, index) => (
                  <Chip key={index} label={person} />
                ))}
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
            }}>
            <Button
              variant='outlined'
              color='error'
              startIcon={<DeleteIcon />}
              onClick={handleDelete}>
              Delete
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant='outlined'
                startIcon={<ShareIcon />}
                onClick={handleShare}>
                Share
              </Button>
              <Button
                variant='contained'
                color='primary'
                startIcon={<EditIcon />}
                onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default MemoryDetails;
