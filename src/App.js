import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import AppRoutes from './routes/AppRoutes';
import { theme } from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppRoutes />
    </Router>
  </ThemeProvider>
);

export default App;
