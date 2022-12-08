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
import CreateNewVisualization from './CreateNewVisualization';
import { Link } from "react-router-dom";
import N1 from './N1'
import N2 from './N2'
import axios from 'axios';



const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const navigateToNewVisuals = () =>{
        navigate("/CreateNewVisualization");
    };

    const navigateToN1 = () => {
        navigate("/N1");
    };
    
    const navigateToN2 = () => {
        navigate("/N2");
    };


    const LogoutButton = () => {                                               //Code for logout button
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }

    const deleteUser = (e) => {

        const params = new URLSearchParams()
        params.append('userID', user.userId)                                                       //Code for delete user

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${user.token}`
                
            }
        }

        axios.post(process.env.REACT_APP_REQUEST_URL + "deleteuser", params, config)
            .then((result) => {
                console.log(result.data)
                if (result.data) {
                    localStorage.removeItem("user")
                    setUser(null)
                    navigate("/")
                }
            })

    }



    return (

        <div className='flex flex-col '>
            <div className='flex h-20 shadow-lg items-center justify-between'>
                <h1 className='text-2xl lg:text-5xl'><Link to="/"><img className=' w-36 h-20 left-0'  src={process.env.PUBLIC_URL + "/globe.png"} /> </Link></h1>
                
                

                <div className='hidden space-x-8 mr-8 lg:flex'>
                    <Button  variant="gradient" > <Link to="N1">Temperature data and CO2 concentrations</Link></Button>
                    <Button  variant="gradient" > <Link to="N2">Emission sources</Link></Button>
                    <Button variant="gradient" onClick={() => { }}>My Visualizations</Button>
                    <Button  variant="gradient" > <Link to="createNewVisualization">Create new visualization</Link></Button>
                    <Menu>
                        <MenuHandler>
                            <Button variant="gradient" className='flex justify-center items-center'>{user.fullname} <FaBars className='text-2xl ml-4' /></Button>
                        </MenuHandler>
                        <MenuList>
                            <span className='pl-3'>{user.username}</span>
                            <MenuItem onClick={LogoutButton}><p className='text-black'>Log out</p></MenuItem>
                            <MenuItem onClick={deleteUser}><p className='text-red-500'>Delete account</p></MenuItem>
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
                            <MenuItem onClick={navigateToN1}><p className='text-black mt-2'>Temperature data and CO2 concentrations</p></MenuItem>
                            <MenuItem onClick={navigateToN2}><p className='text-black mt-2'>Emission sources</p></MenuItem>
                            <MenuItem onClick={navigateToNewVisuals}><p className='text-black'>Create new visualization</p></MenuItem>
                            <MenuItem onClick={LogoutButton}><p className='text-black'>Log out</p></MenuItem>
                            <MenuItem onClick={deleteUser}><p className='text-red-700'>Delete account</p></MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </div>
    )
    }
export default Navbar