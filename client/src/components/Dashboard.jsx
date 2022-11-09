import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut, selectFullname, selectToken, selectUsername } from '../store/userSlice'

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
            <p>{token}</p>
            <p>{userName}</p>
            <p>{fullname}</p>
            <button onClick={temporaryLogoutButton}>Logout</button>
        </div>
    )
}

export default Dashboard