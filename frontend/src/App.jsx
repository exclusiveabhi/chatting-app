import React from "react";
import { Button } from "./components/ui/button";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer"

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"}></Navigate>
  }

  return (
    <>
    <Header></Header>
      <Outlet></Outlet>
      
    </>
  );
}

export default App;
