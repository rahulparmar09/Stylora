import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SalonProvider } from "./context/Saloncontext.jsx";


createRoot(document.getElementById('root')).render(
  <SalonProvider>
    <App />
  </SalonProvider>,
)
