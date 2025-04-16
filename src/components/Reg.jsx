import React from 'react'
import { useState } from 'react'
import './Reg.css'
import { ToastContainer, toast,Bounce } from 'react-toastify'
import { FormContext } from '../contexts/Form'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
const Reg = () => {
  const [form,setform] = useContext(FormContext);
  const [err, seterr] = useState({})
  const [emp, setemp] = useState(false)
  let navigate=useNavigate();
  const check = () => {
    var reg=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._])(?=.*[0-9])[a-zA-Z0-9@._]{8,}$/g
    const newerr = {}
    if (form.Name.length === 0 || form.Email.length === 0 || form.Contact.length === 0 || form.Passkey.length === 0) {
      setemp(!emp)
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      newerr.Name="empty fields"
      return newerr
    }
    if(!reg.test(form.Passkey)){
      newerr.Passkey="The password is not compatible, it should consist of digits,upper and lower case letters along with special character @,.,_"
      return newerr
    }
    return newerr
  }
  const pagegate=()=>{
      navigate("/")
  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
    if(emp){
      setemp(!emp)
    }
    seterr(prev=>({...prev,[e.target.name]:undefined}))
  }
  const handleSubmit=()=>{
    const warns=check()
    if(Object.keys(warns).length===0 && !emp){
        toast.success("Form saved successfully",{
          theme:'light'
        })
        navigate("/Setup")
    }
    else{
      seterr(warns)
    }
  }
  return (
    <div className='pager'>
      <div className='container'>
            <div className="menu">
                <button className='btn' title='clickme' onClick={pagegate}><img src='./home.png' alt='menu' className='mng' width={40} height={40}></img></button>
            </div>
            <div className="brand">HoardStore</div>
            <div className="sides">
            <div className="srch" onClick={pagegate}>FAQs</div>
            </div>
        </div>
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
        theme="light"
        transition={Bounce}
      />
      <div className="mainc">
        <div className="png">
          <img className='sideim' src='/inv.png' alt='img'></img>
        </div>
        <div className="frm">
          <div className="pck">
            <label htmlFor='nm' className='lb'>Enter your Name</label>
            <input type='text' placeholder='Enter your name' name='Name' id='nm' className='blck' value={form.Name} onChange={handlechange} />
          </div>
          <div className="pck">
            <label htmlFor='nm1' className='lb'>Enter your Email</label>
            <input type='text' placeholder='Enter your Email' name='Email' id='nm1' className='blck' value={form.Email} onChange={handlechange} />
          </div>
          <div className="pck">
            <label htmlFor='nm2' className='lb'>Contact Number</label>
            <input type='text' placeholder='Enter your Contact number' name='Contact' id='nm2' className='blck' value={form.Contact} onChange={handlechange} />
          </div>
          <div className="pck">
            <label htmlFor='nm3' className='lb'>Password</label>
            <input type='text' placeholder='Enter a secondary number' name='Passkey' id='nm3' className='blck' value={form.Passkey} onChange={handlechange} />
            {err && <div className='warn'>{err.Passkey}</div>}
          </div>
          <div className="sbn">
            <button type='submit' className='fbtn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reg
