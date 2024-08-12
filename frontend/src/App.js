// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import BuildResume from "./pages/BuildResume";
import Landing from "./pages/Landing";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./store";
import { localStorageKeyAPIToken } from "./constants/api";
import wavesSVG from "../src/assets/waves.svg";
import ShareResume from "./pages/ShareResume";
import ContactChip from "./components/ContactChip";

const PrivateRoutes = () => {
  const token = localStorage.getItem(localStorageKeyAPIToken); // Replace "yourTokenKey" with the actual key used to store the token
  return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <div>
      <img src={wavesSVG} style={{ position: "fixed", bottom: "0px", zIndex: -100000000 }} alt="waves"></img>
      <Provider store={store}>
        <Router>
          <ContactChip />
          <Header />
          <Routes>
            {/* Redirect from / and /home to /home/resume */}
            <Route path="/" element={<Landing />} />
            <Route path="/resume/share/:id" element={<ShareResume />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Navigate to="/home/resume" replace />} />
              <Route path="/home/:tab" element={<Home />} />
              <Route path="/resume/:id" element={<BuildResume />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="*" element={<Navigate to="/home" />} replace />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
