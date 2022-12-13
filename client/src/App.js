import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { UserContext } from './context/UserContext';
import CreateNewVisualization from './components/CreateNewVisualization';
import SharedVisualization from './components/SharedVisualization';
import N1 from './components/N1'
import N2 from './components/N2'
import MyVisualizations from './components/MyVisualizations';

function App() {

  const userAuth = JSON.parse(localStorage.getItem("user"))

  const [user, setUser] = useState(userAuth);

  let authRoutes = <>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>

  if (user?.token) {
    authRoutes = <> <Route path="/" element={<Dashboard />} />
      <Route path="/createNewVisualization" element={<CreateNewVisualization />} />
      <Route path="/myvisuals" element={<MyVisualizations />} />
      <Route path="/N1" element={<N1 />} />
      <Route path="/N2" element={<N2 />} />
    </>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {authRoutes}
        <Route path="/visualization/:urlParam" element={<SharedVisualization />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
