import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminProvider } from "./context/adminContext.jsx";


createRoot(document.getElementById('root')).render(
  <AdminProvider>
    <App />
  </AdminProvider>,
)
