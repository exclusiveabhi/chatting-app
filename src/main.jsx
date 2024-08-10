import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./auth/sign-in/Signin.jsx"; //file name changed hai!
import Home from "./home/Home.jsx"
import Dashboard from "./dashboard/Dashboard.jsx";
import {ClerkProvider} from "@clerk/clerk-react"

//sign in key of clerk!
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

//router yaha hai!

const router = createBrowserRouter([
  {
    
    element: <App> </App>,
    children:[
      {
        path: "/", //iska mtlb hai agar / route pr jaoge to <Home/> component load hona chaiyee!
        element: <Home></Home>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      }

    ]
  },
  {
    path: "/auth/sign-in",
    element: <Signin></Signin>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}></RouterProvider>
    </ClerkProvider>
  </StrictMode>
);
