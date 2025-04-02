import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.main,
        color: 'white',
      }}>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, md: 0 },
            }}>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.3 }}>
              <AccessibilityNewIcon sx={{ mr: 1 }} />
            </motion.div>
            <Typography
              variant='h6'
              component='div'
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: 'white',
              }}>
              <span style={{ fontWeight: 800 }}>Memo</span>
              <span
                style={{ fontWeight: 400, fontFamily: 'Roboto, sans-serif' }}>
                Bloom
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 2, md: 0 },
            }}>
            <Tooltip title='Home'>
              <IconButton color='inherit' onClick={() => navigate('/')}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Help Center'>
              <IconButton color='inherit' onClick={() => navigate('/help')}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Settings'>
              <IconButton color='inherit' onClick={() => navigate('/settings')}>
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant='body2' color='white'>
            © {currentYear}{' '}
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
              }}>
              <span style={{ fontWeight: 800 }}>Memo</span>
              <span
                style={{ fontWeight: 400, fontFamily: 'Roboto, sans-serif' }}>
                Bloom
              </span>
            </span>
            . All rights reserved.
          </Typography>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant='body2' color='white'>
            <Link color='inherit' href='#' sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            |
            <Link color='inherit' href='#' sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            |
            <Link color='inherit' href='#' sx={{ mx: 1 }}>
              Contact Us
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
