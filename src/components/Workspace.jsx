import { React, useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'
import Navbar from './Navbar'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import "./Workspace.css"
const Workspace = () => {
  const expref=useRef([])
  const { id } = useParams()
  const userId = id;
  const [expr, setexpr] = useState(0)
  const [bill, setbill] = useState(0)
  console.log(userId)
  if (!userId) {
    console.log("userid-undefined")
    return;
  }
  const [workspace, setworkspace] = useState(null)
  const fetchspace = async () => {
    // let res = await fetch(`http://localhost:3000/workspace/${userId}`)
    let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${userId}`)
    const space = await res.json();
    setworkspace(space)
  }
  const delitem = async (Name) => {
    // let res = await fetch(`http://localhost:3000/workspace/${userId}/delcard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({Name:Name})})
    let res = await fetch(`${import.meta.env.VITE_API_URL}/workspace/${userId}/delcard`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify({Name:Name})})
    if (res.ok) {
      const msg = await res.json();
      toast.success(`${msg.success}`)
    }
    else{
      const msg=await res.json();
      toast.error(`${msg.err}`)
    }
  }
  useEffect(() => {
    fetchspace();
  }, [userId])
  // useEffect(() => {
  //   if(userId){
  //     sendmail()
  //   }
  // }, [userId])
  useEffect(()=>{
    expref.current.forEach((ref,index)=>{
      const card=workspace.Cards[index];
      const days=(new Date(card.Exp)-new Date())/(1000*60*60*24)
      if(days<=4){
        ref.style.color="red"
        setexpr(expr+1)
      }
    })
  },[workspace])
  useEffect(() => {
    const interval=setInterval(() => {
      expref.current.forEach((ref,index)=>{
        const card=Workspace.Cards[index]
        const days=(new Date(card.Exp)-new Date())/(1000*60*60*24)
        if(days<=0){
          delitem(card.Name)
        }
      })
    }, 3600000);
    return ()=>clearInterval(interval)
  }, [])
  useEffect(() => {
    if(!workspace || !workspace.Cards){
      return ;
    }
    setbill(
      workspace.Cards.reduce((total,card)=>{
        const amt=card.Amount || 0
        const price=card.Price || 0
        return total+(amt*price)
    },0))
  }, [workspace])
  useEffect(() => {
    toast.info('Remember to enter your items that should have unique name', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "light",
      transition: Bounce,
      });
  }, [])
  
  
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
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <div className="bills">Total gross-{bill}</div>
      {workspace?.Cards?.length > 0 ? (<div className='tank'>
        {workspace.Cards.map((Card, index) => (
          <div className="space" key={index}>
            <div className="capn"><img src={`${import.meta.env.VITE_API_URL}/${Card.snap.startsWith("deficon.jpg") ? "public" : "uploads"}/${Card.snap}`} alt={"item image"} className='Snap'></img></div>
            <div className="details">
              <div className="name">{Card.Name}</div>
              <div className="amt">Amount-{Card.Amount}</div>
              <div className="exp" ref={(el)=>expref.current[index]=el}>{Card.Exp}</div>
              <div className="stmp">{Card.Timestmp}</div>
              <button className='dstmp' onClick={()=>delitem(Card.Name)}><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" /></button>
            </div>
          </div>
        ))}
      </div>) : (<div className="msg">No Items added</div>)}
    </div>
  )
}

export default Workspace
