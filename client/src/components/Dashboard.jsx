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
import { FaBars } from 'react-icons/fa'
import Navbar from './Navbar';
import V1 from './charts/V1';
import V3 from './charts/V3';



const Dashboard = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();


    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center  min-w-screen min-h-screen'>
                <V1 />
                <V3 />
            </div>
        </>
    )
}

export default Dashboard