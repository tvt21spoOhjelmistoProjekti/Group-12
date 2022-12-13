import React, { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import { useState } from "react";
import { Textfit } from 'react-textfit';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";
import { Navigate, useParams } from 'react-router-dom'

const MyVisualizations = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)
    const [visualData, setVisualData] = useState([])

    const getData = async () => {

        try {
            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "visualization/myvisual/" + user.userId)
            setVisualData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteMyVisualizations = (e,urlToDelete) => {
        e.preventDefault()
        console.log("here")
        const options = {
            title: 'Are you sure?',
            message: 'You really want to delete this visualization?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                    console.log(urlToDelete)
                        const config = {
                            headers: {                               
                                'Authorization': `Basic ${user.token}`
                            }
                        }

                        axios.delete(process.env.REACT_APP_REQUEST_URL + "visualization/" + urlToDelete, config)
                            .then((response) => {
                                console.log(response.data)
                                if (response.data) {
                                    console.log("poistettu")
                                    navigate("/MyVisualizations")
                                }
                            })
                            .catch((e) => {    //voiko poistaa
                                console.log(e)
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypress: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "overlay-custom-class-name"
        };

        confirmAlert(options);

    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Navbar />
            <div className='bg-blue-400 p-4 xl:p-10 min-h-screen space-y-5'>
                <div className='text-center'>
                    <div className="space-y-5 space-x-5">

                        <h1 className="text-5xl font-bold text-white">My visualizations!</h1>
                        <div>
                            <p className=" font-extrabold space-y-20 text-white">Select which visualization group you want to open</p>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-8  items-center">
                    {visualData.map((data, index) => {
                        return (
                            <div key={index} className="flex" >
                              <div className="flex bg-white p-4 rounded-xl shadow-xl ">  

                                <div className="flex flex-col mr-2 space-y-3 justify-center">
                                    <Textfit className=" bg-gray-300 rounded-full outline-blue-900 border-2 border-blue-700 h-7 w-36 text-center">{data.title}</Textfit>
                                    <Textfit className=" bg-gray-300 rounded-full outline-blue-900 border-2 border-blue-700 h-7 w-36 text-center">{data.url}</Textfit>
                                    <Link to={data.url}>
                                        <button type="button" className="text-white bg-blue-700 rounded-full outline-blue-900 border-2 border-blue-700 h-7 w-36 text-center hover:bg-blue-500">Copy URL</button>
                                    </Link>

                                </div>
                                <div className="flex flex-col space-y-1">
                                    <p className='bg-gray-200 rounded-full outline-blue-900 delay-150 border-2 border-blue-700 h-14 w-96 text-center pt-3 items-end'>{data.description}</p>
                                    <button onClick={(e) => deleteMyVisualizations(e,data.url)} className="text-white bg-red-600 rounded-full outline-red-900 border-2 border-red-700  w-44 h-7 text-center hover:bg-red-500">Delete visualization</button>
                                </div>
                              </div>
                            </div>

                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default MyVisualizations