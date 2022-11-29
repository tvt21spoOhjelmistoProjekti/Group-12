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
        
        <div className='bg-blue-400 p-4 xl:p-20 min-h-screen '>
          <div className=' text-center'>
  <div class="mb-3  space-y-5 flex justify-center">
<h1 class="text-5xl font-bold text-white">Get started and create your own visualization!</h1>
  </div>
<p class=" font-extrabold space-y-10 text-white">lets start by naming your visualization</p>
        <form className=' text-center flex flex-col space-y-5' />   
         <input placeholder='Visualization name' className=' space-y-5 text-center bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-10 w-60' type="name" />
         <div className=' text-center space-x-5 space-y-5'>
          <p class=" font-extrabold space-y-5 text-white">Then click on the visualizations you want to display!</p>
         
          <div class="flex justify-center space-x-5">
          <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="V2" />
          <label for="V2">
         <img src={process.env.PUBLIC_URL + '/atmospheric.png'} alt="logo"/>
         </label>
         <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Atmospheric CO2 concentrations at Mauna Loa</p>
        </div>
         </div>

         <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="V1" />
          <label for="V1">
         <img src={process.env.PUBLIC_URL + '/temperatureanomalies.png'} alt="logo"/>
         </label>
         <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Temperature anomalies starting from 1850</p>
        
         </div>
         </div>

         <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="check3" />
          <label for="check3">
         <img src={process.env.PUBLIC_URL + '/twomillionyears.png'} alt="logo"/>
         </label>
         <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Global temperature over the past two million</p>
        </div>
         </div>
         </div>

         <div class=" flex justify-center space-x-5">
         <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="check4" />
          <label for="check4">
         <img src={process.env.PUBLIC_URL + '/sectors.png'} alt="logo"/>
        </label>
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Global CO2 emissions by sectors</p>
        </div>
        </div>

         <div class="relative w-[400px]">
        <input type="checkbox" class="checkbox" id="check5" />
          <label for="check5">
         <img src={process.env.PUBLIC_URL + '/800yearcomposite.png'} alt="logo"/>
         </label>
         <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Ice core 800k year composite study CO2</p>
        </div>
         </div>
         <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="check6" />
          <label for="check6">
         <img src={process.env.PUBLIC_URL + '/vostok.png'} alt="logo"/>
        </label>
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">Vostok ice core CO2 measurements</p>
        </div>
         </div>
         <div class="relative w-[400px]">
         <input type="checkbox" class="checkbox" id="check7" />
          <label for="check7">
         <img src={process.env.PUBLIC_URL + '/bycountry.png'} alt="logo"/>
        </label>
        <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
            <p class="mt-2 text-sm text-gray-300">CO2 emission by country</p>
        </div>
         </div>
         </div>
         </div>
         <div class="font-extrabold text-white">
         <p>How many columns ?</p>
         </div>
         </div>
        <div className='text-center space-x-5 space-y-5'>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">1 Column</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">2 Columns</button>
        <div class='justify-center space-x-5'>
<textarea id="message" rows="4" class=" h-24 w-72 resize-none p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a description about your visualization.."></textarea>
<button class=" bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Save</button>
         </div>
</div>
        </div>        
   </>
)
}
export default CreateNewVisualization