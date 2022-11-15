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
import { FaBars } from 'react-icons/fa'


const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();


    const temporaryLogoutButton = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }


    return (

        <div className='flex flex-col '>
            <div className='flex h-20 shadow-lg items-center justify-between'>
                <h1 className='text-2xl lg:text-5xl ml-8'>Placeholder</h1>
                <div className='hidden space-x-8 mr-8 lg:flex'>
                    <Button variant="gradient" onClick={() => {
                    }}>My Visualizations</Button>
                    <Button variant="gradient" >Create new visualization</Button>
                    <Menu>
                        <MenuHandler>
                            <Button variant="gradient" className='flex justify-center items-center'>{user.fullname} <FaBars className='text-2xl ml-4' /></Button>
                        </MenuHandler>
                        <MenuList>
                            <span className='pl-3'>{user.username}</span>
                            <MenuItem onClick={temporaryLogoutButton}><p className='text-black'>Log out</p></MenuItem>
                            <MenuItem ><p className='text-red-500'>Delete account</p></MenuItem>
                        </MenuList>
                    </Menu>
                </div>

                <div className='flex mr-5 lg:hidden'>
                    <Menu>
                        <MenuHandler>
                            <button><FaBars className='text-2xl' /></button>
                        </MenuHandler>
                        <MenuList>
                            <span className='pl-3'>{user.username}</span>
                            <MenuItem><p className='text-black mt-2'>My Visualizations</p></MenuItem>
                            <MenuItem><p className='text-black'>Create new visualization</p></MenuItem>
                            <MenuItem onClick={temporaryLogoutButton}><p className='text-black'>Log out</p></MenuItem>
                            <MenuItem ><p className='text-red-700'>Delete account</p></MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navbar