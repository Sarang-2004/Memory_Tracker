import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import theme from './theme';
import './App.css';

// Layout
import Layout from './components/Layout';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PatientLogin = lazy(() => import('./pages/PatientLogin'));
const FamilyLogin = lazy(() => import('./pages/FamilyLogin'));
const PatientDashboard = lazy(() => import('./pages/PatientDashboard'));
const FamilyDashboard = lazy(() => import('./pages/FamilyDashboard'));
const PatientTimeline = lazy(() => import('./pages/PatientTimeline'));
const FamilyTimeline = lazy(() => import('./pages/FamilyTimeline'));
const AddMemory = lazy(() => import('./pages/AddMemory'));
const MemoryDetails = lazy(() => import('./pages/MemoryDetails'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const BreathingGame = lazy(() => import('./pages/BreathingGame'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
    <CircularProgress color='primary' />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/patient/login' element={<PatientLogin />} />
            <Route path='/family/login' element={<FamilyLogin />} />

            {/* Protected routes with Layout */}
            <Route element={<Layout />}>
              <Route path='/patient/dashboard' element={<PatientDashboard />} />
              <Route
                path='/patient/dashboard/timeline'
                element={<PatientTimeline />}
              />
              <Route path='/family/dashboard' element={<FamilyDashboard />} />
              <Route
                path='/family/dashboard/timeline'
                element={<FamilyTimeline />}
              />
              <Route path='/add-memory' element={<AddMemory />} />
              <Route path='/memory/:id' element={<MemoryDetails />} />
              <Route path='/help' element={<HelpCenter />} />
              <Route path='/breathing-game' element={<BreathingGame />} />
              <Route path='/settings' element={<Settings />} />
            </Route>

            {/* Redirect for any unmatched routes */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
