import { React, useState } from 'react'
import './Card.css'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
const Card = () => {
  const { id } = useParams()
  const {token}=useParams()
  const navigate = useNavigate();
  const [card, setcard] = useState({ Name: '', Amount: '', Itemtype: '', Exp: '', Price: '', Timestmp: '', snap: null, Itemid: uuidv4() })
  const handlechange = (e) => {
    setcard({ ...card, [e.target.name]: e.target.value })
  }
  const check = () => {
      const newerr = {}
      if(!card.Name.trim()) newerr.Name="Name is empty"
      if(!card.Amount.trim()) newerr.Amount="Amount is empty"
      if(!card.Itemtype.trim()) newerr.Itemtype="Itemtype is empty"
      if(!card.Price.trim()) newerr.Price="Price is empty"
      return newerr
    }
  const handlefile = (e) => {
    setcard((infrm) => (
      { ...infrm, snap: e.target.files[0] }
    ))
  }
  const handlestmp = () => {
    setcard((inicard) => ({
      ...inicard, Timestmp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }))
  }
  const handlesubmit = async () => {
    const formdata = new FormData();
    const warns=check()
    if(Object.keys(warns).length!==0){
      toast.error("Ensure all fields are complete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
      return;
    }
    else if(card.Itemtype==='Perishables'){
      if(card.Exp.length===0){
        toast.error("Make sure Expiry date is set",{
          theme:"dark"
        })
        return;
      }
      else if (new Date(card.Exp) - new Date() < 0) {
        toast.error("The Expiry may be invalid",{
          theme:"dark"
        })
        return;
      }
    }
    else if(card.Itemtype==='Non-Perishables'){
        if(card.Amount.length===0){
          toast.error("Make sure Amount is set")
          return;
        }
        else if (card.Amount<= 0) {
          toast.error("The Amount is invalid")
          return;
        }
      }
      Object.keys(card).forEach((key) => {
        formdata.append(key, card[key])
      })
      // let res= await fetch(`http://localhost:3000/workspace/${token}/${id}/addcard`,{method:'POST',body:formdata})
      let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${token}/${id}/addcard`, { method: 'POST', body: formdata })
      if (res.ok) {
        let upwork = await res.json()
        navigate(`/Workspace/${token}/${upwork.Userid}`)
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
        theme="dark"
        transition={Bounce}
      />
      <div className="file">
        <input type='file' id='snp' accept='image/png ,image/jpeg' className='snap' onChange={handlefile} />
        <label htmlFor='snp'>
          <img src={card.snap ? URL.createObjectURL(card.snap) : '/deficon.jpg'} alt='image' width={200} height={200} className='ico' />
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
        <div className="pcks">
          <label className='lbu'>Choose the Item type</label>
          <select className='sbox' name='Itemtype' title='Select option' onChange={handlechange} value={card.Itemtype}>
            <option value="" className='cbox' disabled>Perishables/Non-perishables</option>
            <option value="Perishables" className='cbox'>Perishables</option>
            <option value="Non-Perishables" className='cbox'>Non-Perishables</option>
          </select>
        </div>
        {card.Itemtype==='Perishables' && <div className="tabu">
          <label className='lbu' htmlFor='exp'>Enter the Expiry</label>
          <input className='infou' placeholder='Expiry date' name='Exp' onChange={handlechange} value={card.Exp} id='exp' type='date'></input>
        </div>}
        <div className="tabu">
          <label className='lbu' htmlFor='price'>Enter the Price(1 Qty)</label>
          <input className='infou' placeholder='Price of 1Qty' name='Price' onChange={handlechange} value={card.Price} id='price' type='number'></input>
        </div>
        <div className="tabu">
          <label className='lbu' htmlFor='date'>Timestamp</label>
          <input className='infou' value={new Date().toLocaleTimeString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })} name='Timestmp' onChange={handlestmp} id='date'></input>
        </div>
        <div className="tabu">
          <button className='subbtn' onClick={handlesubmit}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Card
