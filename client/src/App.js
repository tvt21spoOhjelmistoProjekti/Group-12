import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { UserContext } from './context/UserContext';
import CreateNewVisualization from './components/CreateNewVisualization';

function App() {

  const userAuth = JSON.parse(localStorage.getItem("user"))

  const [user, setUser] = useState(userAuth);

  let authRoutes = <>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/CreateNewVisualization" element={<CreateNewVisualization />} />
  </>

  if (user?.token) {
    authRoutes = <Route path="/" element={<Dashboard />} />
    authRoutes = <Route path="/" element={<CreateNewVisualization />} />
  
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {authRoutes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
