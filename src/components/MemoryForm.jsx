import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhotoIcon from '@mui/icons-material/Photo';
import MicIcon from '@mui/icons-material/Mic';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PhotoUploader, VoiceRecorder } from './';
import catImage from '../assets/cat.jpg';

const MemoryForm = () => {
  const [memoryType, setMemoryType] = useState('photo');
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    people: [],
    content: '',
    filter: 'none',
  });
  const [newPerson, setNewPerson] = useState('');
  const [photoPreview, setPhotoPreview] = useState(catImage);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle memory type change
  const handleTypeChange = (e) => {
    setMemoryType(e.target.value);
    if (e.target.value === 'photo') {
      setPhotoPreview(catImage);
    }
  };

  // Handle adding a person
  const handleAddPerson = () => {
    if (newPerson.trim() && !formData.people.includes(newPerson.trim())) {
      setFormData({
        ...formData,
        people: [...formData.people, newPerson.trim()],
      });
      setNewPerson('');
    }
  };

  // Handle removing a person
  const handleRemovePerson = (personToRemove) => {
    setFormData({
      ...formData,
      people: formData.people.filter((person) => person !== personToRemove),
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (file) => {
    // In a real app, this would upload to a server
    // For now, we'll just create a local URL for preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setFormData({ ...formData, content: previewUrl });
  };

  // Handle voice recording
  const handleVoiceRecorded = (audioUrl) => {
    setFormData({ ...formData, content: audioUrl });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title) {
      showNotification('Please enter a title for your memory', 'error');
      return;
    }

    if (memoryType === 'photo' && !photoPreview) {
      showNotification('Please upload a photo', 'error');
      return;
    }

    if (memoryType === 'text' && !formData.content) {
      showNotification('Please enter some text for your memory', 'error');
      return;
    }

    // In a real app, this would save to a database
    console.log('Saving memory:', { ...formData, type: memoryType });

    // Show success message
    showNotification('Memory saved successfully!', 'success');

    // Reset form
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      people: [],
      content: '',
      filter: 'none',
    });
    setPhotoPreview(catImage);
    setMemoryType('photo');
  };

  // Show notification
  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  // Close notification
  const closeNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Create New Memory
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Memory Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id='memory-type-label'>Memory Type</InputLabel>
                <Select
                  labelId='memory-type-label'
                  id='memory-type'
                  value={memoryType}
                  label='Memory Type'
                  onChange={handleTypeChange}>
                  <MenuItem value='photo'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhotoIcon sx={{ mr: 1 }} />
                      Photo Memory
                    </Box>
                  </MenuItem>
                  <MenuItem value='voice'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MicIcon sx={{ mr: 1 }} />
                      Voice Memory
                    </Box>
                  </MenuItem>
                  <MenuItem value='text'>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextSnippetIcon sx={{ mr: 1 }} />
                      Text Memory
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='Memory Title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Date'
                type='date'
                name='date'
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Location'
                name='location'
                value={formData.location}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon color='action' sx={{ mr: 1 }} />
                  ),
                }}
              />
            </Grid>

            {/* People */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                <TextField
                  fullWidth
                  label='Add People in this Memory'
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPerson()}
                  InputProps={{
                    startAdornment: (
                      <PeopleIcon color='action' sx={{ mr: 1 }} />
                    ),
                  }}
                  sx={{ mr: 1 }}
                />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleAddPerson}
                  disabled={!newPerson.trim()}>
                  <AddIcon />
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.people.map((person) => (
                  <Chip
                    key={person}
                    label={person}
                    onDelete={() => handleRemovePerson(person)}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Memory Content based on type */}
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Memory Content
              </Typography>

              {memoryType === 'photo' && (
                <Box>
                  <Typography variant='h6' gutterBottom>
                    Upload a Photo
                  </Typography>
                  <PhotoUploader
                    onPhotoSelected={handlePhotoUpload}
                    defaultImage={photoPreview}
                  />

                  {/* Photo filters */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant='subtitle1' gutterBottom>
                      Photo Filter
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id='filter-label'>Apply Filter</InputLabel>
                      <Select
                        labelId='filter-label'
                        id='filter'
                        name='filter'
                        value={formData.filter}
                        label='Apply Filter'
                        onChange={handleInputChange}>
                        <MenuItem value='none'>No Filter</MenuItem>
                        <MenuItem value='polaroid'>Polaroid Frame</MenuItem>
                        <MenuItem value='sepia'>Sepia Tone</MenuItem>
                        <MenuItem value='vintage'>Vintage</MenuItem>
                      </Select>
                    </FormControl>

                    {photoPreview && (
                      <Box sx={{ mt: 2, position: 'relative' }}>
                        <img
                          src={photoPreview}
                          alt='Memory Preview'
                          style={{
                            width: '100%',
                            maxHeight: '300px',
                            objectFit: 'contain',
                            borderRadius:
                              formData.filter === 'none' ? '4px' : '0',
                            border:
                              formData.filter === 'polaroid'
                                ? '15px solid white'
                                : formData.filter === 'sepia'
                                ? '5px solid #d4b483'
                                : formData.filter === 'vintage'
                                ? '8px solid #f5f5f5'
                                : 'none',
                            boxShadow:
                              formData.filter !== 'none'
                                ? '0 4px 8px rgba(0, 0, 0, 0.15)'
                                : 'none',
                            transform:
                              formData.filter === 'polaroid'
                                ? 'rotate(-2deg)'
                                : 'none',
                            filter:
                              formData.filter === 'sepia'
                                ? 'sepia(100%)'
                                : formData.filter === 'vintage'
                                ? 'grayscale(50%)'
                                : 'none',
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              )}

              {memoryType === 'voice' && (
                <Box>
                  <Typography variant='h6' gutterBottom>
                    Record a Voice Memory
                  </Typography>
                  <VoiceRecorder onRecordingComplete={handleVoiceRecorded} />
                </Box>
              )}

              {memoryType === 'text' && (
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label='Write your memory'
                  name='content'
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder='Share your thoughts, stories, or memories here...'
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='large'
                  sx={{ px: 4 }}>
                  Save Memory
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MemoryForm;
