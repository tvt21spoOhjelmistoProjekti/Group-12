import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import { PrivateRoute } from './protectedroute/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//<Login />

export default App;
