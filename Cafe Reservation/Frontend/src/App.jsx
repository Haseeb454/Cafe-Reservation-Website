// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Make sure this is imported
import Home from "./Pages/Home/Home";
import Reserve from "./Pages/Reserve/Reserve";
import Confirmation from "./Pages/Confirmation/Confirmation";
import Navbar from "./Components/Navbar/Navbar";
import AdminSignup from "./Components/AdminAuth/AdminSignup";
import AdminLogin from "./Components/AdminAuth/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const location = useLocation();

  const hideNavbar = ["/reserve", "/confirmation"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {/* ✅ Navbar conditional render */}
      {!hideNavbar && <Navbar />}

      {/* ✅ Page content with optional background */}
      <div
        className={`min-h-screen ${
          !hideNavbar ? "bg-cover bg-center bg-no-repeat" : ""
        }`}
        style={
          !hideNavbar ? { backgroundImage: "url('/Background.jpg')" } : {}
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />

          {/* ✅ Protected Route */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* ✅ Toast Notifications */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
