import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";


const Dashboard = () => {
    const token = localStorage.getItem("token")
    const userName = localStorage.getItem("username")
    const fullname = localStorage.getItem("fullname")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const temporaryLogoutButton = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("fullname")
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
        navigate("/login")
    }


    return (

        <div className='flex flex-col'>
            <div className='flex bg-bear bg-center bg-cover w-full h-screen'>
                <div className='pl-12 pt-12'>
                    <Menu
                        animate={{
                            mount: { y: 0 },
                            unmount: { y: 25 },
                        }}
                    >
                        <MenuHandler>
                            <Button variant="gradient">{fullname}</Button>
                        </MenuHandler>
                        <MenuList>
                            <span className='pl-3'>{userName}</span>
                            <MenuItem onClick={temporaryLogoutButton}><p className='text-black'>Log out</p></MenuItem>
                        </MenuList>
                    </Menu>

                </div>

                <div>
                    <Button variant="gradient" type='submit'>My Visualizations</Button>
                    <Button variant="gradient" type='submit'>Create new visualization</Button>
                </div>
            </div>




        </div>



    )
}

export default Dashboard