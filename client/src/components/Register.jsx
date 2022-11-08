import React from 'react'


const Register = () => {

    return (
        <div className='flex min-h-screen bg-bg-main bg-cover items-center w-full h-full lg:pl-[300px]'>
            <div className='flex-1 lg:flex-none flex justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center px-24 bg-white bg-opacity-70 w-screen lg:w-auto h-full lg:h-3/4 lg:rounded-3xl shadow-xl'>
                <h1 className='text-4xl text-blue-600 '>Welcome!</h1>
                <h1 className='text-xl text-blue-500 mt-5 text-center'>Please fill in your account details</h1>
                <form className='flex flex-col space-y-5 mt-10'>
                    <input placeholder='Username' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" required/>
                    <input placeholder='Password' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="password" minLength="8" required/>
                    <input placeholder='Full Name' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="name" required/>
                    <input placeholder='Age' className='bg-gray-200 rounded-full pl-5 outline-blue-900 transition-all delay-150 border-2 border-blue-700 h-9 w-56' type="number" min="1" max="100" required/>
                    <button className='bg-blue-600 text-white w-56 h-9 rounded-full' type='submit'>Create Account</button>
                </form>
                
                <div className='mt-4'>
                    <h1 className='text-gray-500'>Already have an account? <a className='text-blue-600 font-semibold'>Click here!</a></h1>
                </div>
            </div>
            </div>
        </div>
    )
}


export default Register