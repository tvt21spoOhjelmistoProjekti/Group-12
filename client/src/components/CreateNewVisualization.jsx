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
    const navigate = useNavigate();
return (
    <>
        <Navbar />
        <div className='bg-blue-400 p-4 xl:p-20 min-h-screen'>
          <div className=' text-center'>
          <div class="flex justify-center">
  <div class="mb-3 xl:w-96">
    <textarea
      class=" border-blue-700 border-3 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
      id="exampleFormControlTextarea1"
      rows="3"
      placeholder="Description"
    ></textarea>
  </div>
</div>
        <form className=' text-center flex flex-col space-x-5' />
         <input placeholder='Visualization name' className='text-center bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-10 w-60' type="name" />
         <input placeholder='Description' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-20 w-56' type="name" />
         </div>
         <div className=' text-center space-x-5 space-y-5'>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Temperature anomalies from 1850</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Atmospheric  CO2 concentrations from Mauna Loa measurements starting 1958</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Vostok Ice Core CO2 measurements, 417160 - 2342 years</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Ice core 800k year composite study CO2 measurement</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Evolution of global temperature over the past two million years</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">CO2 emissions by country</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">CO2 emissions by sectors</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Human Evolution and Activities</button>
        <div className='space-x-5'>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">1 Column</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">2 Columns</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Save</button>
        </div>
        </div>
        </div>
        

   </>
)
}
export default CreateNewVisualization