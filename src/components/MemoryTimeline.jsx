import { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Paper,
  Container,
  Grid,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import TimelineIcon from '@mui/icons-material/Timeline';
import { MemoryCard } from './';
import catImage from '../assets/cat.jpg';

// Sample data for testing
const sampleMemories = [
  {
    id: '1',
    title: 'Family Picnic',
    date: '2023-06-15',
    type: 'photo',
    content: catImage,
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
    location: 'Kitchen',
    people: [],
    filter: 'none',
  },
  {
    id: '4',
    title: 'Garden Flowers',
    date: '2023-03-25',
    type: 'photo',
    content: catImage,
    location: 'Backyard',
    people: ['Neighbor'],
    filter: 'sepia',
  },
  {
    id: '5',
    title: 'Childhood Story',
    date: '2023-02-18',
    type: 'voice',
    content: 'audio-story.mp3',
    location: 'Living Room',
    people: ['Grandchildren'],
    filter: 'none',
  },
  {
    id: '6',
    title: 'Old Neighborhood',
    date: '2023-01-05',
    type: 'photo',
    content: catImage,
    location: 'Downtown',
    people: [],
    filter: 'vintage',
  },
];

const MemoryTimeline = ({ memories = sampleMemories, loading = false }) => {
  const [viewMode, setViewMode] = useState('grid');

  const handleViewChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  // Group memories by month and year
  const groupedMemories = memories.reduce((groups, memory) => {
    const date = new Date(memory.date);
    const monthYear = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }

    groups[monthYear].push(memory);
    return groups;
  }, {});

  // Sort groups by date (newest first)
  const sortedGroups = Object.keys(groupedMemories).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  // Render loading skeletons
  if (loading) {
    return (
      <Container>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant='rectangular' width={210} height={40} />
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant='rectangular' height={300} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Memory Timeline
        </Typography>
        <Paper elevation={0}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label='view mode'>
            <ToggleButton value='timeline' aria-label='timeline view'>
              <TimelineIcon />
            </ToggleButton>
            <ToggleButton value='grid' aria-label='grid view'>
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value='list' aria-label='list view'>
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      {sortedGroups.map((monthYear, groupIndex) => (
        <Box key={monthYear} sx={{ mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}>
            <Typography
              variant='h5'
              component='h3'
              gutterBottom
              sx={{
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '50px',
                  height: '3px',
                  bgcolor: 'primary.main',
                },
              }}>
              {monthYear}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {viewMode === 'grid' && (
              <Grid container spacing={3}>
                {groupedMemories[monthYear].map((memory, index) => (
                  <Grid item xs={12} sm={6} md={4} key={memory.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}>
                      <MemoryCard memory={memory} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}

            {viewMode === 'list' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {groupedMemories[monthYear].map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <MemoryCard memory={memory} />
                  </motion.div>
                ))}
              </Box>
            )}

            {viewMode === 'timeline' && (
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: '20px',
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    bgcolor: 'primary.light',
                    zIndex: 0,
                  }}
                />
                {groupedMemories[monthYear].map((memory, index) => (
                  <Box
                    key={memory.id}
                    sx={{
                      display: 'flex',
                      mb: 4,
                      position: 'relative',
                    }}>
                    <Box
                      sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        zIndex: 1,
                        mr: 3,
                      }}>
                      {new Date(memory.date).getDate()}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}>
                        <MemoryCard memory={memory} />
                      </motion.div>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </motion.div>
        </Box>
      ))}

      {memories.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}>
          <Typography variant='h6' color='text.secondary' align='center'>
            No memories found. Start creating your memory journal!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MemoryTimeline;
