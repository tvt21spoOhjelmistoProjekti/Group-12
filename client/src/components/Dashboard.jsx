import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut, selectFullname, selectToken, selectUsername } from '../store/userSlice'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Dashboard = () => {
    const token = useSelector(selectToken)
    const userName = useSelector(selectUsername)
    const fullname = useSelector(selectFullname)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const temporaryLogoutButton = () => {
        dispatch(logOut())
        navigate("/")
    }


    return (
        
        <div>
            <div className='flex bg-bear bg-center bg-cover w-full h-screen'>
                <div className='pl-12 pt-12'>
                <DropdownButton id="dropdown-basic-button" title={" "+userName+" "}>
                <Dropdown.Header>{fullname}</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-2">Delete account</Dropdown.Item>
                <Dropdown.Item onClick={temporaryLogoutButton}>Log out</Dropdown.Item>
                </DropdownButton>
                </div>

                <div>
                    <div className='Alaosa'>
                        <div className='pt-32 items-center justify-center w-full content-center'>
                            <div className='pl-32 pb-48 pt-20'>
                                <button  className='bg-blue-600 text-white text-5xl w-96 h-36 rounded-full' type='submit'>My Visualizations</button>
                            </div>
                            <div className='pl-32 pb-8'>
                                <button  className='bg-blue-600 text-white text-5xl w-96 h-36 rounded-full' type='submit'>Create new visualization</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        
        
    </div>
        

        
    )
}

export default Dashboard