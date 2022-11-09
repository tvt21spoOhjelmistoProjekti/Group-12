import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addFullname, addToken, addUserId, addUsername, selectToken, selectUsername } from '../store/userSlice';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logIn = (e) => {
        e.preventDefault();


        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(process.env.REACT_APP_REQUEST_URL + "login", params, config)
            .then((result) => {
                if (result.data.token) {
                    dispatch(addToken(result.data.token))
                    dispatch(addFullname(result.data.fullname))
                    dispatch(addUserId(result.data.idUsers))
                    dispatch(addUsername(result.data.username))
                    navigate("/dashboard")
                }
            })
    }

    return (
        <div className='flex min-h-screen bg-bg-main bg-cover items-center w-full h-full lg:pl-[300px]'>
            <div className='flex-1 lg:flex-none flex justify-center items-center h-screen'>
                <div className='flex flex-col justify-center items-center px-24 bg-white bg-opacity-70 w-screen lg:w-auto h-full lg:h-3/4 lg:rounded-3xl shadow-xl'>
                    <h1 className='text-4xl text-blue-600 '>Welcome!</h1>
                    <h1 className='text-2xl text-blue-500 mt-5'>Please Log In below.</h1>
                    <form className='flex flex-col space-y-5 mt-10' onSubmit={logIn}>
                        <input placeholder='Username'
                            className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56'
                            type="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input placeholder='Password'
                            className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className='bg-blue-600 text-white w-56 h-9 rounded-full' type='submit'>Log In</button>
                    </form>

                    <div className='mt-4'>
                        <h1 className='text-gray-500'>No account? <a className='text-blue-600 font-semibold' href='/register'>Click here!</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login