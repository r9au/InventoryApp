import {React,useState} from 'react'
import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer,Bounce} from 'react-toastify'
const Login = () => {
    const navigate=useNavigate()
    const [frm, setfrm] = useState({Email:'',Passkey:''})
    const handleChange=(e)=>{
        setfrm({...frm,[e.target.name]:e.target.value})
    }
    const Auth=async()=>{
        // let res= await fetch(`http://localhost:3000/Auth`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(frm)})
        let res= await fetch(`${import.meta.env.VITE_API_URL}/Auth`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(frm)})
        if(res.ok){
            const resp= await res.json()
            localStorage.setItem("User_id",resp.user_id)
            localStorage.setItem("token",resp.token)
            toast.success("Successfully logged in",{
                theme:'light'
            })
            navigate(`/workspace/${resp.token}/${resp.user_id}`)
        }
        else{
            toast.error("Invalid Credentials",{
                theme:"light"
            })
        }
    }
  return (
    <div className='pagelog'>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
       <div className='container'>
            <div className="menu">
                <button className='btn' title='clickme' onClick={()=>navigate("/")}><img src='./home.png' alt='menu' className='mng' width={40} height={40}></img></button>
            </div>
            <div className="brand">HoardStore</div>
            <div className="sides">
            <div className="srch" onClick={()=>navigate("/")}>FAQs</div>
            </div>
        </div>
        <div className="main">
            <div className="pck">
                <label htmlFor='email' className='lb'>Enter the Email</label>
                <input id='email' name='Email' value={frm.Email} className='blck' type='text' onChange={handleChange}/>
            </div>
            <div className="pck">
                <label htmlFor='Passkey' className='lb'>Enter the Password</label>
                <input id='Passkey' name='Passkey' value={frm.Passkey} className='blck' type='password' onChange={handleChange}/>
            </div>
            <div className="bscn">
            <button className="btnl" onClick={Auth}>Login</button>
            <Link className='capl' to='/Reg'>New One! Create Account</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
