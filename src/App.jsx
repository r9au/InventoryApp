import Reg from './components/Reg'
import Setup from './components/Setup'
import Login from './components/Login'
import Land from './components/Land'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import Card from './components/Card'
import Workspace from './components/Workspace'
import Protectedroute from './components/Protectedroute.jsx'

function App() {
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
  return (
    <>
    <RouterProvider router={routes}/>
    </>
  )
}

export default App
