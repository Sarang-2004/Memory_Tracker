import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MemoryForm } from '../components';

const AddMemory = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const steps = ['Create Memory', 'Add Details', 'Review & Save'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // In a real app, we would save the memory to a database
      setCompleted(true);
      // Simulate saving delay
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate(-1);
    } else {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Container maxWidth='md' sx={{ mt: 2, mb: 4 }}>
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mr: 2 }}>
            Back
          </Button>
          <Typography variant='h4' component='h1'>
            Add New Memory
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          {completed ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 4,
              }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}>
                <Alert severity='success' sx={{ mb: 3 }}>
                  Memory saved successfully!
                </Alert>
              </motion.div>
              <Typography variant='h5' gutterBottom>
                Your memory has been added to your collection.
              </Typography>
              <Typography variant='body1' paragraph align='center'>
                Redirecting you to your dashboard...
              </Typography>
            </Box>
          ) : (
            <>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity='error' sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <MemoryForm />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 4,
                }}>
                <Button
                  variant='outlined'
                  onClick={handleCancel}
                  sx={{ borderRadius: 2 }}>
                  Cancel
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {activeStep > 0 && (
                    <Button
                      variant='outlined'
                      onClick={handleBack}
                      sx={{ borderRadius: 2 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    sx={{ borderRadius: 2 }}>
                    {activeStep === steps.length - 1 ? 'Save Memory' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AddMemory;
