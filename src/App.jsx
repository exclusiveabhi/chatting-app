import React from "react";
import { Button } from "./components/ui/button";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to={"/auth/sign-in"}></Navigate>
  }

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export default App;
