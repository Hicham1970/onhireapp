import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import UserProvider from './context/UserContext'
import AlertProvider from './context/AlertContext' // Assurez-vous que ce fichier existe aussi
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <UserProvider>
          <AlertProvider>
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </AlertProvider>
        </UserProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
