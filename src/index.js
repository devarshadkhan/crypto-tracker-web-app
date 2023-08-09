import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient,QueryClientProvider} from "react-query"
// import { ThemeProvider,createMuiTheme } from '@mui/material';
import { ThemeProvider,createTheme  } from '@mui/material';
const theme = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
  sm: 576,
  md: 768,
  lg: 1200,
  xl: 1400,
    }
    
  }
});
const queryCleint = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <QueryClientProvider client={queryCleint}>
  <ThemeProvider theme={theme}>
 
    <App />
 
  </ThemeProvider>
  </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
