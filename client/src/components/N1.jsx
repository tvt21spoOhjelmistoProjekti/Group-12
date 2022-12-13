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
import V7 from './charts/V7';              //imported other charts to show on this page
import V6 from './charts/V6';
import V3_V4 from './charts/V3';

const N1 = () => {

return ( 
    <>
    <Navbar />
    <div className='bg-blue-400 p-4 xl:p-20 min-h-screen'>
    <div className='flex flex-col lg:flex-row gap-10'>
                    <div className='w-full lg:w-1/2 flex flex-col gap-10'>

                        <div className='w-full bg-white rounded shadow-xl'>
                            <V1 />
                        </div>
                        <div className='w-full bg-white rounded shadow-xl'>
                            <V3_V4 />
                        </div>
                        <div className='w-full bg-white rounded shadow-xl'  >  
                            <V5 />                                                     
                        </div>                                                       
                    </div>
                    
                    <div className='w-full lg:w-1/2 flex flex-col gap-10'>

                        <div className='w-full bg-white rounded shadow-xl '>
                            <V6 />
                        </div>
                        <div className='w-full bg-white rounded shadow-xl '>
                            <V7 />
                        </div>
                    </div>
                </div>
        </div>
    </>
)
}
export default N1