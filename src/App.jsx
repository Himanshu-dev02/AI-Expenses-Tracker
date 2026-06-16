 import React, { useState } from "react";
 import { Routes, Route, useNavigate } from "react-router-dom";
 import Layout from "./components/Layout";
 import Dashboard from "./pages/Dashboard";
 
 const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const clearAuth = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("Error clearing auth data:", error);
      
    }
    setUser(null);
    setToken(null);
  }



    const handleLogout = () => {
      clearAuth();
      navigate("/login");
    };
   return (
      <>
      <Routes>
        <Route element={<Layout user={user} onLogout={handleLogout}/>}>
        <Route path="/" element={<Dashboard/>}/>
        </Route>
      </Routes>
      </>
   )
 }
 
 export default App;