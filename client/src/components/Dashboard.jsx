import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import V1 from './charts/V1';
import V5 from './charts/V5';
import V3 from './charts/V3';
import V6 from './charts/V6';



const Dashboard = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();


    return (
        <>
            <Navbar />
            <div>
                <V1 />
                <V5 />
                <V3 />
                <V6 />
            </div>
        </>
    )
}

export default Dashboard