
import React, { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Link } from "react-router-dom";
import { Navigate, useParams } from 'react-router-dom'

const MyVisualizations = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)
    const [visualData, setVisualData] = useState([])

    const getData = async () => {

        try {
            var config = {
                headers: {
                    'Authorization': `Basic ${user.token}`   // user authorization
                }
            }
            const response = await axios.get(process.env.REACT_APP_REQUEST_URL + "visualization/myvisual/" + user.userId, config)
            setVisualData(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteMyVisualizations = (e, urlToDelete) => {
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
                                    getData()
                                }
                            })
                            .catch((e) => {
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
                <div className='text-center items-center'>
                    <div className="space-y-5 space-x-5">

                        <h1 className="text-5xl font-bold text-white">My visualizations!</h1>
                        <div>
                            <p className=" font-bold space-y-20 text-white">All your visualizations are listed below.</p>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-8  items-center">
                    {visualData.map((data, index) => {
                        const copied = false;
                        return (
                            <div key={index} className="flex w-11/12 lg:w-2/5" >
                                <div className="flex flex-col w-full bg-white p-4 rounded-xl shadow-xl ">

                                    <div className="flex flex-col mr-2 space-y-3 justify-center">
                                        <div className="flex space-x-2 text-xl">
                                            <p className="font-bold">Title:</p>
                                            <p>{data.title}</p>
                                        </div>
                                        <div className="flex space-x-2 text-xl w-full">
                                            <p className="font-bold">Description: {"   "} </p>
                                            <p className='break-words'> {data.description}</p>
                                        </div>


                                    </div>
                                    <div className="flex justify-between mt-3">
                                        <LinkBtn />
                                        <button onClick={(e) => deleteMyVisualizations(e, data.url)} className="text-white bg-red-600 rounded-full outline-red-900 border-2 border-red-700  w-44 h-7 text-center hover:bg-red-500">Delete visualization</button>
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

const LinkBtn = ({ link }) => {
    const [copied, setCopied] = useState(false)

    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText("https://sinuous-branch-370709.lm.r.appspot.com/visualization/" + link)
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 3000)
            }}
            type="button"
            className={copied ? "text-white bg-green-500 rounded-full  h-7 w-36 text-center transition-all delay-150" : "text-white bg-blue-700 rounded-full outline-blue-900 border-2 border-blue-700 h-7 w-36 text-center hover:bg-blue-500 transition-all delay-150"} >
            {copied ? "Copied" : "Copy URL"}
        </button>


    )
}

export default MyVisualizations