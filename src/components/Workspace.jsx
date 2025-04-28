import { React, useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import "./Workspace.css"
const Workspace = () => {
  const expref = useRef([])
  const amtref=useRef([])
  const { id } = useParams()
  const {token}=useParams()
  const userId = id;
  const [expr, setexpr] = useState(0)
  const [bill, setbill] = useState(0)
  const [appr, setappr] = useState(false)
  const [frm, setfrm] = useState({Amount:"",Itemid:"",Itemtype:""})
  const [tab1, settab1] = useState(false) 
  if (!userId) {
    // console.log("userid-undefined")
    return;
  }
  const [workspace, setworkspace] = useState(null)
  const fetchspace = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${token}/${userId}`)
      // let res = await fetch(`http://localhost:3000/workspace/${token}/${userId}`)
      const space = await res.json();
      setworkspace(space)
    } catch (err) {
      console.log(err)
      toast.error("Error while fetching workspace")
    }
  }
  const delitem = async (Itemid, Itemtype) => {
    // let res = await fetch(`http://localhost:3000/workspace/${token}/${userId}/delcard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ Itemid: Itemid, Itemtype: Itemtype }) })
    let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${token}/${userId}/delcard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({Itemid:Itemid,Itemtype:Itemtype})})
    if (res.ok) {
      const msg = await res.json();
      toast.success(`${msg.success}`)
    }
    else {
      const msg = await res.json();
      toast.error(`${msg.err}`)
    }
  }
  const upcrd=async(card)=>{
      setappr(!appr)
      setfrm(prev=>({...prev,Amount:card.Amount,Itemid:card.Itemid,Itemtype:card.Itemtype}))
  }
  useEffect(() => {
    fetchspace();
  }, [userId, bill])
  useEffect(() => {
    expref.current.forEach((ref, index) => {
      const card = workspace.PCards[index];
      const days = (new Date(card.Exp) - new Date()) / (1000 * 60 * 60 * 24)
      if (days <= 4) {
        ref.style.color = "red"
        ref.style.borderColor="red"
        setexpr(expr + 1)
      }
    })
    amtref.current.forEach((aref,index)=>{
      const card=workspace.NPCards[index]
      if(card.Amount<=5){
        aref.style.color = "red"
        aref.style.borderColor="red"
      }
    })
  }, [workspace])
  useEffect(() => {
    const interval = setInterval(() => {
      expref.current.forEach((ref, index) => {
        const card = Workspace.PCards[index]
        const days = (new Date(card.Exp) - new Date()) / (1000 * 60 * 60 * 24)
        if (days <= 0) {
          delitem(card.Name)
        }
      })
    }, 3600000);
    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (!workspace || !workspace.PCards) {
      return;
    }
    let total = 0;
    workspace.PCards.forEach((card) => {
      total += parseInt(card.Amount) * parseInt(card.Price)
    })
    workspace.NPCards.forEach((card) => {
      total += parseInt(card.Amount) * parseInt(card.Price)
    })
    setbill(total)
  }, [workspace])
  const handfrm=(e)=>{
    setfrm({...frm,[e.target.name]:e.target.value})
  }
  const submitfrm=async()=>{
      if(isNaN(frm.Amount)){
        toast.error("The Amount entered is not valid")
      }
      else{
        // let res=await fetch(`http://localhost:3000/workspace/${token}/${userId}/updatecard`,{ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(frm)})
        let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${token}/${userId}/updatecard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(frm)})
        console.log(frm)
        if(res.ok){
          let resp=await res.json()
          toast.success(`${resp.success},refresh the page`)
          setappr(!appr)
        }else{
          let resp=await res.json()
          toast.error(resp.err)
        }
      }
  }
  return (
    <div className="wrk">
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
      <Navbar />
      <div className="bills">Total gross-{bill}</div>
      {appr && <div className="upcrd">
          <div className="tle">Card Update</div>
          <div className="box">
            <input value={frm.Amount} name='Amount' onChange={handfrm} placeholder='Enter New Amount' className="boxvalue"/>
            <input value={frm.Itemtype} name='card_type' className="boxvalue"/>
            <div className="field">
            <button onClick={submitfrm} type='submit' className="boxbtn">Submit</button>
            <button onClick={()=>setappr(!appr)} className="boxbtn">Close</button>
            </div>
          </div>
      </div>}
      <div className="crds">
        <div className="tcap">
          <div className="capt">Perishables</div>
          <button className="capbtn" onClick={()=>settab1(!tab1)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button>
        </div>
        {!tab1 && (workspace?.PCards?.length > 0 ? (<div className='tank'>
          {workspace.PCards.map((Card, index) => (
            <div className="space" key={index}>
              <div className="capn"><img src={`${import.meta.env.VITE_API_URL}/${Card.snap.startsWith("deficon.jpg") ? "public" : "uploads"}/${Card.snap}`} alt={"item image"} className='Snap'></img></div>
              <div className="details">
                <div className="name">{Card.Name}</div>
                <div className="amt">Quantity-{Card.Amount}</div>
                {Card.Exp && <div className="exp" ref={(el) => expref.current[index] = el}>{Card.Exp}</div>}
                <div className="price">Price of 1 unit{Card.Price}</div>
                <div className="stmp">{Card.Timestmp}</div>
                <div className="cfield">
                <button className='dstmp' onClick={() => delitem(Card.Itemid, Card.Itemtype)}><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" /></button>
                <button className='dstmp' onClick={()=>upcrd(Card)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M14.5 5.5L3 17 3 21 7 21 18.5 9.5zM21.2 2.8c-1.1-1.1-2.9-1.1-4 0L16 4l4 4 1.2-1.2C22.3 5.7 22.3 3.9 21.2 2.8z"></path>
                </svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>) : (<div className="msg">No Items added</div>))}
        <div className="tcap">
        <div className="capt">Non-Perishables</div>
        <button className="capbtn" onClick={()=>settab1(!tab1)}>
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg>
        </button>
        </div>
        {tab1 && (workspace?.NPCards?.length > 0 ? (<div className='tank'>
          {workspace.NPCards.map((Card, index) => (
            <div className="space" key={index}>
              <div className="capn"><img src={`${import.meta.env.VITE_API_URL}/${Card.snap.startsWith("deficon.jpg") ? "public" : "uploads"}/${Card.snap}`} alt={"item image"} className='Snap'></img></div>
              <div className="details">
                <div className="name">{Card.Name}</div>
                <div className="amt" aref={(amt)=>amtref.current[index]=amt}>Quantity-{Card.Amount}</div>
                {Card.Exp && <div className="exp" ref={(el) => expref.current[index] = el}>{Card.Exp}</div>}
                <div className="price">Price of 1 unit-{Card.Price}</div>
                <div className="stmp">{Card.Timestmp}</div>
                <div className="cfield">
                <button className='dstmp' onClick={() => delitem(Card.Itemid, Card.Itemtype)}><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" /></button>
                <button className='dstmp' onClick={()=>upcrd(Card)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M14.5 5.5L3 17 3 21 7 21 18.5 9.5zM21.2 2.8c-1.1-1.1-2.9-1.1-4 0L16 4l4 4 1.2-1.2C22.3 5.7 22.3 3.9 21.2 2.8z"></path>
                </svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>) : (<div className="msg">No Items added</div>))}
      </div>
    </div>
  )
}

export default Workspace
