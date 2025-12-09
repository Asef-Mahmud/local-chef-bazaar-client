import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import router from './routes/Router'
import { RouterProvider } from "react-router/dom";
import AuthProvider from './context/AuthContext/AuthProvider'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
