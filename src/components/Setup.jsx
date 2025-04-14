import {React,useContext,useState} from 'react'
import './Setup.css'
import { FormContext } from '../contexts/Form'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Setup = () => {
    const navigate=useNavigate()
    const [bform, setbform] = useContext(FormContext)
    const [check, setcheck] = useState(false)
    const [err, seterr] = useState({})
    const appr = () => {
        setcheck(!check)
    }
    const handleChange = (e) => {
        setbform({ ...bform, [e.target.name]: e.target.value })
        seterr(prev=>({...prev,[e.target.name]:undefined}))
    }
    const validate=()=>{
        const newerr={}
        if(bform.Gst.length===0){
            seterr(newerr.Gst="Empty field")
        }
        if(bform.Address.length===0){
            seterr(newerr.Address="Empty field")
        }
        if(bform.Btype.length===0){
            seterr(newerr.btype="Empty field")
        }
        return Object.keys(newerr).length===0
    }
    const handleSubmit = async() => {
        if (!check) {
            toast.error("Please Approve the details by hitting checkbox", {
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
        }
        else if(!validate()){
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
        }
        else{
            let res=await fetch(`${process.env.REACT_APP_API_URL}/datasub`,{method:"POST",body:JSON.stringify(bform),headers:{'Content-Type':'application/json'}})
            // const res=await req.json()
            if(res.ok){
                toast.success("Form submitted Successfully",{
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
                setTimeout(() => {
                    navigate('/Login')
                }, 1000);
            }
            else{
                toast.error("Some error occured",{
                    theme:"light"
                })
            }
        }
    }
    return (
        <div className='Spage'>
            <div className='container'>
            <div className="menu">
                <button className='btn' title='clickme'><img src='./home.png' alt='menu' className='mng' width={40} height={40}></img></button>
            </div>
            <div className="sides">
            <div className="srch">FAQs</div>
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
                    <img src='btoon.png' alt='btoon' className='sidelg'></img>
                </div>
                <div className="frm">
                    <div className="pck">
                        <label className='lb' htmlFor='blck'>Enter your Gst number</label>
                        <input type='text' name='Gst' value={bform.Gst} className='blck' onChange={handleChange} placeholder='Enter Gst number'></input>
                    </div>
                    <div className="pck">
                        <label className='lb' htmlFor='blcka'>Enter Shop Address</label>
                        <input type='text' name='Address' value={bform.Address} className='blcka' onChange={handleChange} placeholder='Enter shop Address'></input>
                    </div>
                    <div className="pcks">
                        <label className='lb'>Choose the buisness type</label>
                        <select className='sbox' name='Btype' title='Select option' onChange={handleChange} value={bform.Btype} de>
                            <option value="" className='cbox'>Choose the type</option>
                            <option value="cloths" className='cbox'>Cloths</option>
                            <option value="Grocery" className='cbox'>Grocery</option>
                            <option value="Franchise" className='cbox'>Franchise</option>
                            <option value="Restraunt" className='cbox'>Restraunt</option>
                        </select>
                    </div>
                    <div className="final">
                        <input type='checkbox' className='tick' id='ch' onClick={appr}></input>
                        <label className='lbs' htmlFor='ch'>I agree that Information provide by me is valid</label>
                    </div>
                    <div className="sbn">
            <button type='submit' className='fbtn' onClick={handleSubmit}>Submit</button>
          </div>
                </div>
            </div>
        </div>
    )
}

export default Setup
