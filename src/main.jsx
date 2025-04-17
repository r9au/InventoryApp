import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormProvider } from './contexts/Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormProvider>
    <App />
    </FormProvider>
  </StrictMode>,
)
