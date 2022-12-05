import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);

