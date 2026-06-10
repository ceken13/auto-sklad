import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { FilterProvider } from './context/FilterContext';
import { CompareProvider } from './context/CompareContext';
import App from './app/app';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <FilterProvider>
        <CompareProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </CompareProvider>
      </FilterProvider>
    </ThemeProvider>
  </StrictMode>,
);
