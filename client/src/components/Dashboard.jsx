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


const Dashboard = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();


    const temporaryLogoutButton = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }


    return (

        <div className='flex flex-col'>
            <div className='flex bg-bear bg-center bg-cover w-full h-screen'>
                <div className='pl-12 pt-12'>
                    <Menu>
                        <MenuHandler>
                            <Button variant="gradient">{user.fullname}</Button>
                        </MenuHandler>
                        <MenuList>
                            <span className='pl-3'>{user.username}</span>
                            <MenuItem onClick={temporaryLogoutButton}><p className='text-black'>Log out</p></MenuItem>
                        </MenuList>
                    </Menu>

                </div>

                <div>
                    <Button variant="gradient" onClick={() => {
                    }}>My Visualizations</Button>
                    <Button variant="gradient" >Create new visualization</Button>
                </div>
            </div>




        </div>



    )
}

export default Dashboard