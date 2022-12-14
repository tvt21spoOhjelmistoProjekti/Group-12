import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
const Register = ({ onSubmitForTest }) => {
    const { user, setUser } = useContext(UserContext)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");                                                           //Variables
    const [fullname, setFullName] = useState("");
    const [age, setAge] = useState("")
    const navigate = useNavigate();

    const signup = (e) => {

        e.preventDefault();

        if (onSubmitForTest) {
            onSubmitForTest({
                status: "true"
            })
        }

        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)                                                             //Parameters for registration
        params.append('fullname', fullname)
        params.append('age', age)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post(process.env.REACT_APP_REQUEST_URL + "login" + "/signup", params, config)                         //HTTP request to register
            .then((result) => {
                if (result.data.token) {
                    const user = {
                        status: "logged_in",
                        token: result.data.token,
                        username: result.data.fullname,
                        userId: result.data.idUsers,
                        fullname: result.data.username
                    }

                    setUser(user)
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/")
                }
            }).catch(err => console.log(err))

    }

    return (                                                                                                                        //Page html code
        <div className='flex min-h-screen bg-bg-bear bg-cover items-center w-full h-full lg:pl-[300px]'>
            <div className='flex-1 lg:flex-none flex justify-center items-center h-screen'>
                <div className='flex flex-col justify-center items-center px-24 bg-white bg-opacity-70 w-screen lg:w-auto h-full lg:h-3/4 lg:rounded-3xl shadow-xl'>
                    <h1 className='text-4xl text-blue-600 '>Welcome!</h1>
                    <h1 className='text-xl text-blue-500 mt-5 text-center'>Please fill in your account details</h1>
                    <form className='flex flex-col space-y-5 mt-10' onSubmit={signup}>
                        <input placeholder='Username' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" value={username} onChange={e => setUsername(e.target.value)} required />
                        <input placeholder='Password' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="8" required />
                        <input placeholder='Full Name' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" value={fullname} onChange={e => setFullName(e.target.value)} required />
                        <input placeholder='Age' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="number" value={age} onChange={e => setAge(e.target.value)} min="1" max="100" required />
                        <button className='bg-blue-600 text-white w-56 h-9 rounded-full' type='submit'>Create Account</button>
                    </form>

                    <div className='mt-4'>
                        <h1 className='text-gray-500'>Already have an account? <a className='text-blue-600 font-semibold' href='/'>Click here!</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Register