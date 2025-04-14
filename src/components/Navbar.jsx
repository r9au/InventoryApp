import {React, useState } from 'react'
import './Navbar.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
const Navbar = () => {
    const {id}=useParams()
    const [task, settask] = useState(false)
    const navigate=useNavigate()
const menu=()=>{
    settask(!task)
}
const Navigateadd=()=>{
    navigate(`/Card/${id}`)
}
const Navigaterm=()=>{
    navigate(`/Card/${id}`)
}
const signout=()=>{
    localStorage.removeItem("User_id")
    localStorage.removeItem("token")
    toast.success("Signout Successful")
    navigate("/Login")
}
    return (
        <div className='navbar'>
            <div className="menu">
                <button className='btn' title='clickme' onClick={menu}><img width="30" height="30" src="https://img.icons8.com/ios/100/menu--v7.png" alt="menu--v7" className='menusvg'/></button>
            </div>
            <div className="brand">HoardStore</div>
            {task && <div className="taskbar">
                <button className="actbtn" onClick={Navigateadd}>Add Item</button>
                <button className="actbtn" onClick={signout}>Signout</button>
            </div>}
        </div>
    )
}

export default Navbar
