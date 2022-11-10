import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export { PrivateRoute };

function PrivateRoute({ children }) {

    const token = localStorage.getItem("token")
    if (token == "null" || !token) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    } else {
        return children;

    }

    // authorized so return child components
}