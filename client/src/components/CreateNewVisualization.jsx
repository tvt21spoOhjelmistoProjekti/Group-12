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


const CreateNewVisualization= () => {
return (
    <>
        <Navbar />
        <div className='bg-blue-400 p-4 xl:p-20 min-h-screen'>
            <div className=' text-center'>
        <form className=' text-center flex flex-col space-y-5 mt-10' />
         <input placeholder='Visualization name' className=' text-center bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" />
         <input placeholder='Description' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" />
         </div>
         <div className=' text-center'>
        <button class="  border-deep-purple-900  bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V1+V2</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V2+V3</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full ">V4</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V5</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V6</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V7</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V8</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V9</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">V10</button>
        <div>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">1 Column</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">2 Columns</button>
        </div>
        </div>
        <div className=' text-center'>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full">Save</button>
        </div>
        </div>
        

   </>
)
}
export default CreateNewVisualization