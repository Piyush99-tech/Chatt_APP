import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthProvider.jsx'; // ✅ Import AuthProvider
import {BrowserRouter} from 'react-router-dom'
import { SocketProvider } from './context/SocketContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AuthProvider>
      <SocketProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
      </SocketProvider>
    </AuthProvider>

  </BrowserRouter>
  
);
