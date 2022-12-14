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
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

const Navbar = ({ deleteMockFunction, exampleContext }) => {

    const { user, setUser } = useContext(UserContext)


    ////////////////////////////////////////
    const navigate = useNavigate();


    const LogoutButton = () => {                                                //Code for logout button
        localStorage.removeItem("user")
        setUser(null)
        navigate("/")
    }

    const deleteUser = (e) => {

        if (deleteMockFunction) {
            deleteMockFunction("This is clicked")
        }

        const options = {
            title: 'Are you sure?',                                                                         //Delete user, including confirmation
            message: 'You really want to delete that account?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                                                                                        

                        const config = {
                            headers: {
                                'Authorization': `Basic ${user.token}`

                            }
                        }

                        axios.delete(process.env.REACT_APP_REQUEST_URL + "deleteuser/" + user.userId, config)
                            .then((result) => {
                                console.log(result.data)
                                if (result.data) {
                                    localStorage.removeItem("user")
                                    setUser(null)
                                    navigate("/")
                                }
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



    return (                                                                                                    //HTML code for the navbar

        <div className='flex flex-col '>
            <div className='flex h-20 shadow-lg items-center justify-between'>
                <h1 className='text-2xl lg:text-5xl ml-8'><Link to="/">CDV</Link></h1>


                {user?.token || exampleContext?.token ?
                    <>
                        <div className='hidden space-x-8 mr-8 lg:flex'>
                            <Button variant="gradient" onClick={() => navigate("/N1")} >Temperature data and CO2 concentrations</Button>
                            <Button variant="gradient" onClick={() => navigate("/N2")}  >Emission sources</Button>
                            <Button variant="gradient" onClick={() => navigate("/myvisuals")} >Visualizations</Button>
                            <Button variant="gradient" onClick={() => navigate("/createNewVisualization")} >Create new visualization</Button>
                            <Menu>
                                <MenuHandler>
                                    <Button data-testid="menu-btn" className='flex justify-center items-center'>{exampleContext ? exampleContext.fullname : user.fullname} <FaBars className='text-2xl ml-4' /></Button>
                                </MenuHandler>
                                <MenuList>
                                    <span className='pl-3'>{exampleContext ? exampleContext.username : user.username}</span>
                                    <MenuItem onClick={LogoutButton}><p className='text-black'>Log out</p></MenuItem>
                                    <MenuItem onClick={deleteUser} data-testid="logout-btn"><p className='text-red-500'>Delete account</p></MenuItem>
                                </MenuList>
                            </Menu>
                        </div>

                        <div className='flex mr-5 lg:hidden'>
                            <Menu>
                                <MenuHandler>
                                    <button data-testid="menu-btn" ><FaBars className='text-2xl' /></button>
                                </MenuHandler>
                                <MenuList>
                                    <span className='pl-3'>{exampleContext ? exampleContext.username : user.username}</span>
                                    <MenuItem onClick={() => navigate("/myvisuals")}><p className='text-black mt-2'>My Visualizations</p></MenuItem>
                                    <MenuItem onClick={() => navigate("/N1")}><p className='text-black'>Temperature data and CO2 concentrations</p></MenuItem>
                                    <MenuItem onClick={() => navigate("/N2")}><p className='text-black '>Emission sources</p></MenuItem>
                                    <MenuItem onClick={() => navigate("/createNewVisualization")}><p className='text-black'>Create new visualization</p></MenuItem>
                                    <MenuItem onClick={LogoutButton} data-testid="logout-btn"><p className='text-black'>Log out</p></MenuItem>
                                    <MenuItem onClick={deleteUser}><p className='text-red-700'>Delete account</p></MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </>
                    :
                    <div className='flex gap-5 pr-5'>
                        <Link to="/"><Button variant="gradient" >Login</Button></Link>
                        <Link to="/register"><Button variant="gradient" >Register</Button></Link>
                    </div>
                }









            </div>
        </div>
    )
}
export default Navbar