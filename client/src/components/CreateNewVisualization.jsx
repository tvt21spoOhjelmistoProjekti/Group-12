import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";

const CreateNewVisualization = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [userID, setUserID] = useState([]);
  const [visu, setVisu] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleChange = () => {
    setChecked(!checked);
  };
    const handleChange2 = () => {
      setChecked2(!checked2);
    };
      const handleChange3 = () => {
        setChecked3(!checked3);
      };
        const handleChange4 = () => {
          setChecked4(!checked4);
        };
          const handleChange5 = () => {
            setChecked5(!checked5);
          };
            const handleChange6 = () => {
              setChecked6(!checked6);
            };
              const handleChange7 = () => {
                setChecked7(!checked7);
              };
                
  const save = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("userID", setUserID);
    params.append("visu", setVisu);
    params.append("title", setTitle);
    params.append("description", setDescription);
    params.append("columns", setColumns);
    console.log("valitsit");
  };
  return (
    <>
      <Navbar />

      <div className="bg-blue-400 p-4 xl:p-20 min-h-screen text-center ">
        <div className="mb-3  space-y-5 flex justify-center">
          <h1 class="text-5xl  font-bold text-white">
            Get started and create your own visualization!
          </h1>
        </div>
        <p class=" font-extrabold space-y-10 text-white">
          lets start by giving your visualization a title!
        </p>
        <form
          className=" items-center text-center flex flex-col"
          onSubmit={save}
        >
          <input
            placeholder="Title name"
            className=" mt-5 text-center bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-10 w-60"
            type="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className=" text-center space-x-5 space-y-5">
            <p class="  mt-5 font-extrabold  text-white">
              Then click on the visualizations you want to display!
            </p>
            <div class="flex justify-center space-x-5">
              <div class="relative w-[400px]">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="V3"
                  value="V3"
                  checked={checked}
                  onChange={handleChange}
                />
                <label for="V3">
                  <img
                    src={process.env.PUBLIC_URL + "/atmospheric.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Atmospheric CO2 concentrations at Mauna Loa
                  </p>
                </div>
              </div>

              <div class="relative w-[400px]">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="V1" 
                  value="V1"
                  checked={checked2}
                  onChange={handleChange2}
                  />
                <label for="V1">
                  <img
                    src={process.env.PUBLIC_URL + "/temperatureanomalies.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Temperature anomalies starting from 1850
                  </p>
                </div>
              </div>

              <div class="relative w-[400px]">
                <input 
                type="checkbox" 
                class="checkbox"
                 id="V7"
                 value="V7"
                 checked={checked3}
                 onChange={handleChange3}
                  />
                <label for="V7">
                  <img
                    src={process.env.PUBLIC_URL + "/twomillionyears.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Global temperature over the past two million years
                  </p>
                </div>
              </div>
            </div>

            <div class=" flex justify-center space-x-5">
              <div class="relative w-[400px]">
                <input 
                type="checkbox" 
                class="checkbox"
                 id="V9" 
                 value="V9"
                 checked={checked4}
                 onChange={handleChange4}
                  />
                <label for="V9">
                  <img
                    src={process.env.PUBLIC_URL + "/sectors.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Global CO2 emissions by sectors
                  </p>
                </div>
              </div>

              <div class="relative w-[400px]">
                <input 
                type="checkbox"
                 class="checkbox" 
                 id="V6" 
                 value="V6"
                 checked={checked5}
                 onChange={handleChange5}
                  />
                <label for="V6">
                  <img
                    src={process.env.PUBLIC_URL + "/800yearcomposite.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Ice core 800k year composite study CO2
                  </p>
                </div>
              </div>

              <div class="relative w-[400px]">
                <input 
                type="checkbox"
                 class="checkbox" 
                 id="V5"
                 value="V5"
                 checked={checked6}
                 onChange={handleChange6}
                   />
                <label for="V5">
                  <img
                    src={process.env.PUBLIC_URL + "/vostok.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    Vostok ice core CO2 measurements
                  </p>
                </div>
              </div>
              <div class="relative w-[400px]">
                <input 
                type="checkbox" 
                class="checkbox" 
                id="V8" 
                value="V8"
                checked={checked7}
                onChange={handleChange7}
                  />
                <label for="V8">
                  <img
                    src={process.env.PUBLIC_URL + "/bycountry.png"}
                    alt="logo"
                  />
                </label>
                <div class="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p class="mt-2 text-sm text-gray-300">
                    CO2 emission by country
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-x-5 space-y-5">
            <div className=" mt-5 space-x-5">
             
<p class="mb-4 mt-5 font-extrabold text-white">How many columns?</p>
<ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input 
            id="1-column" 
            type="radio" 
            value="1" 
            name="list-radio" 
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="1-column" class="py-3 ml-2 w-full text-sm font-semibold text-blue-600 dark:text-gray-300">1 column </label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
        <div class="flex items-center pl-3">
            <input 
             id="2-columns"
             type="radio" value="2" 
             name="list-radio"
             class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
           <label for="2-columns" class="py-3 ml-2 w-full text-sm font-semibold text-blue-600 dark:text-gray-300">2 columns</label>
        </div>
    </li>
</ul>




            </div>
            <div class="justify-center space-x-5">
              <textarea
                id="description"
                rows="4"
                class=" h-24 w-72 resize-none p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a description about your visualization.."
              ></textarea>
              <button
                class=" bg-white hover:bg-white text-blue-500 font-bold py-3 px-6 rounded-full border-white border-2"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNewVisualization;
