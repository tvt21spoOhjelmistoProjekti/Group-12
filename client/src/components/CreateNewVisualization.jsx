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
import { Result } from "postcss";

const CreateNewVisualization = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);                                      //Variables
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [userID, setUserID] = useState([]);
  const [visu, setVisu] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [columns, setColumns] = useState([]);

  const save = (e) => {
    e.preventDefault();
    var visualstring = "";
    if (checked) {
      visualstring += "V3_V4,";
    }
    if (checked2) {
      visualstring += "V1,V2,";
    }
    if (checked3) {
      visualstring += "V7,";
    }
    if (checked4) {
      visualstring += "V9,";                                              //Choosing visualizations
    }
    if (checked5) {
      visualstring += "V6,";
    }
    if (checked6) {
      visualstring += "V5_Data,";
    }
    if (checked7) {
      visualstring += "V8,";
    }
    if (checked || checked3) {
      visualstring += "V10,";
    }
    visualstring.slice(0, -1);

    const params = new URLSearchParams();
    params.append("userId", user.userId);
    params.append("visualizations", visualstring.slice(0, -1));
    params.append("title", title);                                              //Adding proper data for storage
    params.append("desc", description);
    params.append("columns", columns);

    var config = {
      headers: {
        Authorization: `Basic ${user.token}`,                                   //Authorization for http request
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    console.log(
      "valitsit" +
      visualstring.slice(0, -1) +
      "   " +
      columns +
      description +
      title
    );

    axios
      .post(
        process.env.REACT_APP_REQUEST_URL + "visualization/create",                             //Sending http request to create new visualization
        params,
        config
      )
      .then((result) => {
        if (result.data) {                                                        
          navigate("/visualization/" + result.data);
        }

        console.log(result);
      })
      .catch((e) => { });
  };

  return (                                                                                    //HTTP code for the page layout
    <>                                                                                                
      <Navbar />                                                                              

      <div className="bg-blue-400   xl:p-20 min-h-screen text-center ">
        <div className="mb-3  space-y-5 flex justify-center">
          <h1 className="text-5xl  font-bold text-white">
            Get started and create your own visualization!
          </h1>
        </div>

        <p className=" font-extrabold space-y-10 text-white">
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
            required={true}
          />
          <div className=" text-center space-x-5 space-y-5">
            <p className="  mt-5 font-extrabold  text-white">
              Then click on the visualizations you want to display!
            </p>
            <div className="flex flex-col gap-10 lg:flex-row justify-center items-center">
              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V3"
                  value="V3"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <label for="V3">
                  <img
                    src={process.env.PUBLIC_URL + "/atmospheric.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Atmospheric CO2 concentrations at Mauna Loa
                  </p>
                </div>
              </div>

              <div className=" relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V1"
                  value="V1"
                  checked={checked2}
                  onChange={() => setChecked2(!checked2)}
                />
                <label for="V1">
                  <img
                    src={process.env.PUBLIC_URL + "/temperatureanomalies.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Temperature anomalies starting from 1850
                  </p>
                </div>
              </div>

              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V7"
                  value="V7"
                  checked={checked3}
                  onChange={() => setChecked3(!checked3)}
                />
                <label for="V7">
                  <img
                    src={process.env.PUBLIC_URL + "/twomillionyears.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Global temperature over the past two million years
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-10 lg:flex-row justify-center items-center">
              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V9"
                  value="V9"
                  checked={checked4}
                  onChange={() => setChecked4(!checked4)}
                />
                <label for="V9">
                  <img
                    src={process.env.PUBLIC_URL + "/sectors.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Global CO2 emissions by sectors
                  </p>
                </div>
              </div>

              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V6"
                  value="V6"
                  checked={checked5}
                  onChange={() => setChecked5(!checked5)}
                />
                <label for="V6">
                  <img
                    className="h-[236px]"
                    src={process.env.PUBLIC_URL + "/IceCore800k.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Ice core 800k year composite study CO2
                  </p>
                </div>
              </div>

              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V5"
                  value="V5"
                  checked={checked6}
                  onChange={() => setChecked6(!checked6)}
                />
                <label for="V5">
                  <img
                    src={process.env.PUBLIC_URL + "/vostok.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    Vostok ice core CO2 measurements
                  </p>
                </div>
              </div>
              <div className="relative lg:w-96 w-3/4">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="V8"
                  value="V8"
                  checked={checked7}
                  onChange={() => setChecked7(!checked7)}
                />
                <label for="V8">
                  <img
                    src={process.env.PUBLIC_URL + "/bycountry.png"}
                    alt="logo"
                  />
                </label>
                <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
                  <p className="mt-2 text-sm text-gray-300">
                    CO2 emission by country
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center space-x-5 space-y-5">
            <div className=" mt-5 space-x-5">
              <p className="mb-4 mt-5 font-extrabold text-white">
                How many columns?
              </p>
              <ul className=" flex flex-col lg:flex-row items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="1-column"
                      type="radio"
                      value={columns}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => setColumns(1)}
                      required
                    />
                    <label
                      for="1-column"
                      className="py-3 ml-2 w-full text-sm font-semibold text-blue-600 dark:text-gray-300"
                    >
                      1 column{" "}
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="2-columns"
                      type="radio"
                      value="2"
                      onChange={() => setColumns(2)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="2-columns"
                      className="py-3 ml-2 w-full text-sm font-semibold text-blue-600 dark:text-gray-300"
                    >
                      2 columns
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div class=" flex flex-col lg:flex-row justify-center gap-5">
              <textarea
                id="description"
                rows="4"
                class=" h-24 w-72 resize-none p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write a description about your visualization.."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
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
