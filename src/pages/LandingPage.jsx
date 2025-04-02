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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PeopleIcon from '@mui/icons-material/People';
import MemoryIcon from '@mui/icons-material/Memory';
import SpaIcon from '@mui/icons-material/Spa';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          py: { xs: 8, sm: 12, md: 16 },
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}>
        <Container maxWidth='lg'>
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              zIndex: 0,
            }}
          />

          <Grid
            container
            spacing={5}
            alignItems='center'
            sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}>
                <Typography
                  variant='h1'
                  component='h1'
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    mb: 3,
                    textAlign: { xs: 'center', md: 'left' },
                  }}>
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 800,
                    }}>
                    Memo
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                    }}>
                    Bloom
                  </span>
                </Typography>

                <Typography
                  variant='h5'
                  component='h2'
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 4,
                    textAlign: { xs: 'center', md: 'left' },
                    opacity: 0.9,
                  }}>
                  Preserve Memories. Nurture Connections. Stay Present in Every
                  Moment.
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant='contained'
                    color='secondary'
                    size='large'
                    onClick={handlePatientLogin}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 10,
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}>
                    Get Started
                  </Button>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant='outlined'
                    size='large'
                    onClick={handleFamilyLogin}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 10,
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                      },
                    }}>
                    Family Connect
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}>
                <Box
                  component='img'
                  src='https://source.unsplash.com/random/600x600/?family,memory,elderly'
                  alt='Family memories'
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    mx: 'auto',
                    display: 'block',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container
        maxWidth='lg'
        sx={{ py: { xs: 5, sm: 6, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
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
            sx={{
              mb: { xs: 4, md: 6 },
              color: 'primary.main',
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
            }}>
            Features
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent='center'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'visible',
              maxWidth: '1100px',
              mx: 'auto',
            }}>
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <motion.div
                  variants={itemVariants}
                  style={{ width: '100%', display: 'flex' }}>
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      borderRadius: 2,
                      boxShadow: 3,
                      maxWidth: { xs: '100%', sm: '280px', md: '320px' },
                      mx: 'auto',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'translateY(-10px)' },
                        boxShadow: { xs: 3, sm: 10 },
                      },
                    }}>
                    <Box
                      sx={{
                        p: { xs: 2, sm: 3 },
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}>
                      {feature.icon}
                    </Box>
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: { xs: '160px', sm: '180px', md: '200px' },
                        padding: { xs: 2, sm: 3 },
                      }}>
                      <Typography
                        variant='h5'
                        component='h3'
                        align='center'
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          fontSize: {
                            xs: '1.25rem',
                            sm: '1.4rem',
                            md: '1.5rem',
                          },
                        }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        align='center'
                        sx={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          lineHeight: 1.6,
                        }}>
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
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: { xs: 5, sm: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}>
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
              sx={{
                mb: { xs: 4, md: 6 },
                color: 'primary.main',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              }}>
              How It Works
            </Typography>

            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              justifyContent='center'
              alignItems='stretch'
              sx={{
                maxWidth: '1100px',
                mx: 'auto',
              }}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    height: '100%',
                    borderRadius: 3,
                    maxWidth: { xs: '100%', md: '500px' },
                    mx: 'auto',
                  }}>
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
                      sx={{
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                      }}>
                      For Patients
                    </Typography>
                    <Box sx={{ pl: { xs: 1, sm: 2 } }}>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        1. Create an account and log in to your personal
                        dashboard.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        2. Record memories through photos, voice recordings, or
                        text.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        3. Organize memories in a timeline and add details like
                        location and people.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        4. Access calming exercises when feeling anxious or
                        overwhelmed.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 0, sm: 0 },
                        }}>
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
                  sx={{
                    p: { xs: 3, sm: 4 },
                    height: '100%',
                    borderRadius: 3,
                    maxWidth: { xs: '100%', md: '500px' },
                    mx: 'auto',
                  }}>
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
                      sx={{
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                      }}>
                      For Family Members
                    </Typography>
                    <Box sx={{ pl: { xs: 1, sm: 2 } }}>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        1. Receive an invitation code from your loved one.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        2. Create an account and connect to your family member's
                        collection.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        3. View shared memories and add your own contributions.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 1.5, sm: 2 },
                        }}>
                        4. Receive notifications about new memories and
                        activities.
                      </Typography>
                      <Typography
                        paragraph
                        sx={{
                          fontSize: { xs: '0.95rem', sm: '1rem' },
                          mb: { xs: 0, sm: 0 },
                        }}>
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
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
        }}>
        <Container maxWidth='md'>
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
              fontWeight: 600,
              mb: { xs: 2, sm: 3 },
            }}>
            Start Preserving Your Memories Today
          </Typography>
          <Typography
            variant='h6'
            paragraph
            sx={{
              mb: { xs: 4, sm: 5 },
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}>
            Join MemoBloom and create a lasting collection of precious moments
            for you and your loved ones.
          </Typography>
          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant='contained'
            color='primary'
            size='large'
            onClick={handlePatientLogin}
            sx={{
              py: { xs: 1, sm: 1.5 },
              px: { xs: 3, sm: 4 },
              borderRadius: 8,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '300px', sm: 'none' },
              mx: 'auto',
            }}>
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
