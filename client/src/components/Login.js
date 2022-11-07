import React from 'react'


const Login = () => {

    return (
        <div className='flex justify-between items-center min-h-screen'>
            <div className='flex-1 flex flex-col justify-center items-center px-24'>
                <h1 className='text-4xl text-blue-600 '>Welcome!</h1>
                <h1 className='text-2xl text-blue-500 mt-5'>Please Log In below.</h1>
                <form className='flex flex-col justify-center items-center space-y-5 mt-10'>
                    <input placeholder='User name' className='bg-gray-200 rounded-full pl-5 outline-blue-900 border-2 border-blue-700 h-9 w-56' type="name" />
                    <input placeholder='password' className='bg-gray-200 rounded-full pl-5 outline-blue-900 border-2 border-blue-700 h-9 w-56' type="password" />
                    <button className='bg-blue-600 text-white w-56 h-9 rounded-full' type='submit'>Log In</button>
                </form>
                <div className='mt-2'>
                    <h1 className='text-gray-500'>No account? <a className='text-blue-600 font-semibold'>Click here!</a></h1>
                </div>
            </div>
            <div className='hidden lg:flex'>
                <img className=' min-h-screen' src={"https://ichef.bbci.co.uk/news/976/cpsprodpb/A1F5/production/_116316414_gettyimages-1204032321_smaller.jpg"} alt="picture" />
            </div>
        </div>
    )
}



export default Login