import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { FilterProvider } from './context/FilterContext';
import App from './app/app';
import '@fontsource/inter';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <FilterProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </FilterProvider>
    </ThemeProvider>
  </StrictMode>,
);
