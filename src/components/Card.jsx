import {React, useState} from 'react'
import './Card.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast,ToastContainer,Bounce } from 'react-toastify'
const Card = () => {
  const {id}=useParams()
  const navigate=useNavigate();
  const [card, setcard] = useState({Name:'',Amount:'',Exp:'',Price:'',Timestmp:'',snap:null})
  const handlechange=(e)=>{
    setcard({...card,[e.target.name]:e.target.value})
  }
  const handlefile=(e)=>{
    setcard((infrm)=>(
      {...infrm,snap:e.target.files[0]}
    ))
  }
  const handlestmp=()=>{
    setcard((inicard)=>({
      ...inicard,Timestmp:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
    }))
  }
  const handlesubmit=async()=>{
    const formdata=new FormData();
    if(new Date(card.Exp)-new Date()<0){
      toast.error("The Expiry may be not valid")
    }
    else{
      Object.keys(card).forEach((key)=>{
        formdata.append(key,card[key])
      })
      // let res= await fetch(`http://localhost:3000/workspace/${id}/addcard`,{method:'POST',body:formdata})
      let res= await fetch(`${process.env.REACT_APP_API_URL}/workspace/${id}/addcard`,{method:'POST',body:formdata})
      if(res.ok){
         let upwork= await res.json()
         navigate(`/Workspace/${upwork.Userid}`)
      }
    }
  }
  return (
    <div className="card">
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
      <div className="file">
        <input type='file' id='snp' accept='image/png ,image/jpeg' className='snap' onChange={handlefile}/>
        <label htmlFor='snp'>
          <img src={card.snap?URL.createObjectURL(card.snap):'/deficon.jpg'} alt='image' width={200} height={200} className='ico'/>
        <span><p className='inp'>Select item image</p></span>
        </label>
      </div>
      <div className="maincon">
      <div className="tabu">
        <label className='lbu'>Enter the Item name</label>
        <input className='infou' placeholder='Name of item' name='Name' onChange={handlechange} value={card.Name}></input>
      </div>
      <div className="tabu">
        <label className='lbu'>Enter the Amount ordered</label>
        <input className='infou' placeholder='Amount of item' name='Amount' onChange={handlechange} value={card.Amount} type='number'></input>
      </div>
      <div className="tabu">
        <label className='lbu' htmlFor='exp'>Enter the Expiry</label>
        <input className='infou' placeholder='Expiry date' name='Exp' onChange={handlechange} value={card.Exp} id='exp' type='date'></input>
      </div>
      <div className="tabu">
        <label className='lbu' htmlFor='price'>Enter the Price(1 Qty)</label>
        <input className='infou' placeholder='Price of 1Qty' name='Price' onChange={handlechange} value={card.Price} id='price' type='number'></input>
      </div>
      <div className="tabu">
        <label className='lbu' htmlFor='date'>Timestamp</label>
        <input className='infou' value={new Date().toLocaleTimeString([],{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'})} name='Timestmp' onChange={handlestmp} id='date'></input>
      </div>
      <div className="tabu">
        <button className='subbtn' onClick={handlesubmit}>Add</button>
      </div>
      </div>
    </div>
  )
}

export default Card
