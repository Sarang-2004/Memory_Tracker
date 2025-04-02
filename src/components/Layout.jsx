import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Toolbar /> {/* This creates space below the fixed navbar */}
      <Container
        component='main'
        sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 3 } }}>
        <Outlet /> {/* This renders the child routes */}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
