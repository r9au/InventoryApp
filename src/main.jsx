import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Card from './components/Card.jsx'
import Reg from './components/Reg'
import Setup from './components/Setup'
import Login from './components/Login'
import Land from './components/Land'
import { FormProvider } from './contexts/Form.jsx'
import Protectedroute from './components/Protectedroute.jsx'
import Workspace from './components/Workspace.jsx'
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Land />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Signup',
    element: <Reg />
  },
  {
    path: '/Setup',
    element: <Setup />
  },
  {
    path:'/Reg',
    element:<Reg/>
  },
  {
    path:'/workspace/:id',
    element:<Protectedroute><Workspace/></Protectedroute>
  },
  {
     path:'/Card/:id',
    element:<Card/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormProvider>
    <RouterProvider router={routes}/>
    <App />
    </FormProvider>
  </StrictMode>,
)
