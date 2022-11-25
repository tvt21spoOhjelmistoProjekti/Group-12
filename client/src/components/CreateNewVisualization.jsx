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
  <div class="mb-3  space-y-5">
<h1 class="mb-3 text-3xl font-extrabold tracking-tight leading-none text-gray-900  dark:text-white">Get started and create your own visualization!</h1>
  </div>
</div>
<p class=" font-extrabold space-y-10">lets start by naming your visualization</p>
        <form className=' text-center flex flex-col space-y-5' />   
         <input placeholder='Visualization name' className=' space-y-5 text-center bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-10 w-60' type="name" />
         <div className=' text-center space-x-5 space-y-5'>
          <p class=" font-extrabold space-y-5">Then click on the visualizations you want to display!</p>
          <div class="flex justify-center">
</div>
          <div class="  flex justify-center space-x-5  ">
          <input type="checkbox" class="checkbox" id="check1" />
          <label for="check1">
         <img class=" .object-scale-down h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/maunaloa.png'} alt="logo"/>
         </label>
         <input type="checkbox" class="checkbox" id="check2" />
          <label for="check2">
         <img class=" .object-scale-down h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/temperatureanomalies.png'} alt="logo"/>
         </label>
         <input type="checkbox" class="checkbox" id="check3" />
          <label for="check3">
         <img class=" .object-scale-down h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/twomillionyers.png'} alt="logo"/>
         </label>
         </div>
         <div class="flex space-x-5 justify-center">
         <input type="checkbox" class="checkbox" id="check4" />
          <label for="check4">
         <img class="  h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/sectors.png'} alt="logo"/>
        </label>
        <input type="checkbox" class="checkbox" id="check5" />
          <label for="check5">
         <img class=" .object-scale-down h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/800k.png'} alt="logo"/>
         </label>
         <input type="checkbox" class="checkbox" id="check6" />
          <label for="check6">
         <img class=" .object-scale-down h-48 w-96 rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={process.env.PUBLIC_URL + '/vostok.png'} alt="logo"/>
        </label>
         </div>
         <div class="font-extrabold">
         <p>How many columns ?</p>
         </div>
         </div>
         </div>
        <div className='text-center space-x-5 space-y-5'>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">1 Column</button>
        <button class="bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">2 Columns</button>
        <div class='justify-center space-x-5'>
<textarea id="message" rows="4" class=" h-24 w-72 resize-none p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a brief description about your visualization.."></textarea>
<button class=" bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-black border-2">Save</button>
</div>
        </div>
        </div>
        

   </>
)
}
export default CreateNewVisualization