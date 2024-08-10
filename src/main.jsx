import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './auth/sign-in/Signin.jsx' //file name changed hai!

//router yaha hai!

const router = createBrowserRouter([
  {
path:"/",
element: <App> </App>
  },
  {
    path: "/auth/sign-in",
    element: <Signin></Signin>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
