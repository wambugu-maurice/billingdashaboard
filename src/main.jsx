import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './components/AuthProvider'
import {  ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
            <App />
          <Toaster position="top-center" reverseOrder={false}/>
    </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
