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
  CardMedia,
  CardActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PeopleIcon from '@mui/icons-material/People';
import MemoryIcon from '@mui/icons-material/Memory';
import SpaIcon from '@mui/icons-material/Spa';

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePatientLogin = () => {
    navigate('/patient/login');
  };

  const handleFamilyLogin = () => {
    navigate('/family/login');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  const features = [
    {
      title: 'Memory Recording',
      description:
        'Easily record memories through photos, voice recordings, or text entries.',
      icon: <MemoryIcon fontSize='large' />,
    },
    {
      title: 'Family Connection',
      description:
        'Share memories with family members and caregivers through secure access codes.',
      icon: <PeopleIcon fontSize='large' />,
    },
    {
      title: 'Calming Exercises',
      description:
        'Access breathing exercises and relaxation techniques to reduce anxiety.',
      icon: <SpaIcon fontSize='large' />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}>
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}>
        <Container maxWidth='lg'>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <Typography
              variant='h2'
              component='h1'
              gutterBottom
              sx={{ fontWeight: 'bold', mb: 2 }}>
              Memory Tracker
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <Typography
              variant='h5'
              sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
              A supportive tool for dementia patients and their families to
              preserve and share precious memories together.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item>
                <Button
                  variant='contained'
                  size='large'
                  color='secondary'
                  onClick={handlePatientLogin}
                  startIcon={<AccessibilityNewIcon />}
                  sx={{ py: 1.5, px: 4, borderRadius: 8 }}>
                  Patient Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  size='large'
                  onClick={handleFamilyLogin}
                  startIcon={<PeopleIcon />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 8,
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}>
                  Family Login
                </Button>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}>
          <Typography
            variant='h3'
            component='h2'
            align='center'
            gutterBottom
            sx={{ mb: 6, color: 'primary.main' }}>
            Features
          </Typography>

          <Grid container spacing={4} justifyContent='center'>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: 10,
                      },
                    }}>
                    <Box
                      sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}>
                      {feature.icon}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h3'
                        align='center'>
                        {feature.title}
                      </Typography>
                      <Typography align='center'>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth='lg'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <Typography
              variant='h3'
              component='h2'
              align='center'
              gutterBottom
              sx={{ mb: 6, color: 'primary.main' }}>
              How It Works
            </Typography>

            <Grid
              container
              spacing={6}
              justifyContent='center'
              alignItems='flex-start'>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={2}
                  sx={{ p: 4, height: '100%', borderRadius: 3 }}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}>
                    <Typography
                      variant='h4'
                      gutterBottom
                      align='center'
                      color='primary.main'
                      sx={{ mb: 3 }}>
                      For Patients
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      <Typography paragraph>
                        1. Create an account and log in to your personal
                        dashboard.
                      </Typography>
                      <Typography paragraph>
                        2. Record memories through photos, voice recordings, or
                        text.
                      </Typography>
                      <Typography paragraph>
                        3. Organize memories in a timeline and add details like
                        location and people.
                      </Typography>
                      <Typography paragraph>
                        4. Access calming exercises when feeling anxious or
                        overwhelmed.
                      </Typography>
                      <Typography paragraph>
                        5. Share your memory collection with trusted family
                        members.
                      </Typography>
                    </Box>
                  </motion.div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={2}
                  sx={{ p: 4, height: '100%', borderRadius: 3 }}>
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}>
                    <Typography
                      variant='h4'
                      gutterBottom
                      align='center'
                      color='primary.main'
                      sx={{ mb: 3 }}>
                      For Family Members
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      <Typography paragraph>
                        1. Receive an invitation code from your loved one.
                      </Typography>
                      <Typography paragraph>
                        2. Create an account and connect to your family member's
                        collection.
                      </Typography>
                      <Typography paragraph>
                        3. View shared memories and add your own contributions.
                      </Typography>
                      <Typography paragraph>
                        4. Receive notifications about new memories and
                        activities.
                      </Typography>
                      <Typography paragraph>
                        5. Help manage the account and provide support as
                        needed.
                      </Typography>
                    </Box>
                  </motion.div>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}>
        <Container maxWidth='md'>
          <Typography variant='h4' gutterBottom>
            Start Preserving Your Memories Today
          </Typography>
          <Typography variant='h6' paragraph sx={{ mb: 4 }}>
            Join Memory Tracker and create a lasting collection of precious
            moments for you and your loved ones.
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant='contained'
            color='primary'
            size='large'
            onClick={handlePatientLogin}
            sx={{ py: 1.5, px: 4, borderRadius: 8 }}>
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
