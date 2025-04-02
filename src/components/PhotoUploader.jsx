import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import catImage from '../assets/cat.jpg';

const PhotoUploader = ({ onPhotoSelected, defaultImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(defaultImage ? true : null);
  const [previewUrl, setPreviewUrl] = useState(defaultImage || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // If a default image is provided, use it
    if (defaultImage) {
      setPreviewUrl(defaultImage);
      setSelectedFile(true);
    }
  }, [defaultImage]);

  // Set default cat image if nothing provided
  useEffect(() => {
    if (!previewUrl) {
      setPreviewUrl(catImage);
      setSelectedFile(true);
      if (onPhotoSelected) {
        // Create a File object from the cat image, if possible
        fetch(catImage)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'cat.jpg', { type: 'image/jpeg' });
            onPhotoSelected(file);
          })
          .catch((err) =>
            console.log('Could not convert default image to file object', err)
          );
      }
    }
  }, []);

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };

  // Handle file selection via button
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  // Process the selected file
  const processFile = (file) => {
    setIsUploading(true);
    setSelectedFile(file);

    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      if (onPhotoSelected) {
        onPhotoSelected(file);
      }
    }, 1000);
  };

  // Clear the selected file
  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {!selectedFile ? (
        <Paper
          component={motion.div}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          sx={{
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            bgcolor: isDragging
              ? 'rgba(106, 90, 205, 0.05)'
              : 'background.paper',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept='image/*'
            style={{ display: 'none' }}
          />
          <CloudUploadIcon
            sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
          />
          <Typography variant='h6' gutterBottom>
            Drag & Drop Photo Here
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            or click to browse your files
          </Typography>
          <Button
            variant='contained'
            color='primary'
            startIcon={<PhotoCameraIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}>
            Select Photo
          </Button>
        </Paper>
      ) : (
        <Box sx={{ position: 'relative' }}>
          {isUploading ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
              }}>
              <CircularProgress size={60} />
              <Typography variant='body1' sx={{ mt: 2 }}>
                Uploading photo...
              </Typography>
            </Box>
          ) : (
            <Box sx={{ position: 'relative' }}>
              <img
                src={previewUrl}
                alt='Preview'
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
                onClick={handleClearFile}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PhotoUploader;
