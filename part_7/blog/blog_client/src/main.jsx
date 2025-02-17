import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.jsx';
import ContextProvider from './Provider.jsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
