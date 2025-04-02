import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  CardActionArea,
} from '@mui/material';
import { motion } from 'framer-motion';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

// Sample placeholder images for testing
const placeholderImages = [
  'https://source.unsplash.com/random/300x200/?family',
  'https://source.unsplash.com/random/300x200/?elderly',
  'https://source.unsplash.com/random/300x200/?memory',
  'https://source.unsplash.com/random/300x200/?nature',
];

const MemoryCard = ({
  memory = {
    id: '1',
    title: 'Family Picnic',
    date: '2023-06-15',
    type: 'photo', // 'photo', 'voice', 'text'
    content:
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
    location: 'Central Park',
    people: ['Mom', 'Dad', 'Sister'],
    filter: 'polaroid', // 'polaroid', 'sepia', 'vintage', 'none'
  },
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event) event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    navigate(`/memory/${memory.id}`);
  };

  // Apply different styles based on the filter type
  const getFilterStyle = () => {
    switch (memory.filter) {
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
    switch (memory.type) {
      case 'photo':
        return (
          <CardMedia
            component='img'
            height='200'
            image={memory.content}
            alt={memory.title}
            sx={getFilterStyle()}
          />
        );
      case 'voice':
        return (
          <Box
            sx={{
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.light',
              borderRadius: 2,
              mb: 2,
            }}>
            <IconButton
              size='large'
              sx={{ color: 'white', '&:hover': { transform: 'scale(1.1)' } }}>
              <MicIcon fontSize='large' />
              <Typography variant='body2' sx={{ ml: 1 }}>
                Play Voice Memory
              </Typography>
            </IconButton>
          </Box>
        );
      case 'text':
        return (
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              mb: 2,
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Typography variant='body1' color='text.primary'>
              {memory.content}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  // Get icon based on memory type
  const getTypeIcon = () => {
    switch (memory.type) {
      case 'photo':
        return <PhotoIcon fontSize='small' />;
      case 'voice':
        return <MicIcon fontSize='small' />;
      case 'text':
        return <TextSnippetIcon fontSize='small' />;
      default:
        return <PhotoIcon fontSize='small' />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
      <Card
        sx={{
          maxWidth: 345,
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
          bgcolor: 'background.paper',
          position: 'relative',
        }}>
        <CardActionArea onClick={handleCardClick}>
          {renderMemoryContent()}

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <Box>
                <Typography gutterBottom variant='h6' component='div'>
                  {memory.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {new Date(memory.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>
              <IconButton
                aria-label='more'
                id='memory-menu-button'
                aria-controls={open ? 'memory-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClick}
                sx={{ mt: -1, mr: -1 }}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={getTypeIcon()}
                label={
                  memory.type.charAt(0).toUpperCase() + memory.type.slice(1)
                }
                size='small'
                color='primary'
                variant='outlined'
              />
              {memory.location && (
                <Chip
                  icon={<LocationOnIcon fontSize='small' />}
                  label={memory.location}
                  size='small'
                  variant='outlined'
                />
              )}
              {memory.people && memory.people.length > 0 && (
                <Chip
                  icon={<PeopleIcon fontSize='small' />}
                  label={`${memory.people.length} people`}
                  size='small'
                  variant='outlined'
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>

        <Menu
          id='memory-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'memory-menu-button',
          }}>
          <MenuItem
            onClick={(e) => {
              handleClose(e);
              navigate(`/memory/${memory.id}`);
            }}>
            View Details
          </MenuItem>
          <MenuItem onClick={handleClose}>Share Memory</MenuItem>
          <MenuItem onClick={handleClose}>Edit Memory</MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
};

export default MemoryCard;
