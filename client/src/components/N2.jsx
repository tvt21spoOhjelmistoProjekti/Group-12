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
import V8 from './charts/V8';                  //Imported charts to show on this page
import V9 from './charts/V9';

const N2 = () => {

return ( 
    <>
    <Navbar />
    <div className='bg-blue-400 p-4 xl:p-20 min-h-screen'>
    <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='w-full lg:w-1/2 flex flex-col gap-10'>

                        <div className='w-full bg-white rounded shadow-xl'>
                            <V8 />
                        </div>
                        </div>
                        <div className='w-full lg:w-1/2 flex flex-col gap-10' >
                        <div className='w-full bg-white rounded shadow-xl'>
                            <V9 />
                        </div>
                        </div>
                    
                </div>
        </div>
    </>
)
}
export default N2