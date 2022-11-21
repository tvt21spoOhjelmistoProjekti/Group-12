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
import V9 from './charts/V9';
import V7 from './charts/V7';
import V6 from './charts/V6';
import V3_V4 from './charts/V3';



const Dashboard = () => {
    const { user, setUser } = useContext(UserContext)


    return (
        <>
            <Navbar />
            <div className='bg-blue-400 p-4 xl:p-20 min-h-screen'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 min-w-ful xl:px-20 '>
                    <div className='w-full bg-white rounded shadow-xl'>
                        <V1 />
                    </div>
                    <div className='w-full bg-white rounded shadow-xl'>
                        <V3_V4 />
                    </div>
                    <div className='w-full bg-white rounded shadow-xl'  >
                        <V5 />
                    </div>
                    <div className='w-full bg-white rounded shadow-xl '>
                        <V7 />
                    </div>
                    <div className='w-full bg-white rounded shadow-xl '>
                        <V9 />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard