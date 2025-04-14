import {React ,useState, useRef} from 'react'
import './Land.css'
import {useNavigate} from 'react-router-dom'
const Land = () => {
    const navigate=useNavigate()
    const [tub1, settub1] = useState(false)
    const [tub2, settub2] = useState(false)
    const [tub3, settub3] = useState(false)
    const [tub4, settub4] = useState(false)
    const [tub5, settub5] = useState(false)
    const play=()=>{
        navigate('/Login')
    }
    return (
        <div className='Lpage'>
            <div className='container'>
                <div className="menu">
                    <button className='btn' title='home'><img src='./home.png' alt='menu' className='mng' width={40} height={40}></img></button>
                </div>
                <div className="brand">HoardStore</div>
                <div className="sides">
                    <div className="srch">FAQs</div>
                </div>
            </div>
            <div className="ftab">
                <img src='/simage2.jpg' className='wimage'></img>
                <div className="frame">
                    <div className="tag">Get Inventory Management<br /> at your Tips.</div>
                    <div className="sign">
                        <button className='sbtn' to='/Login' onClick={play}>Sign In</button>
                    </div>
                </div>
            </div>
            <div className="line"></div>
            <div className="stab">
                <video loop className='wvideo' muted={true} autoPlay={true}>
                    <source src='/invvid.mp4' type='video/mp4'></source>
                </video>
                <div className="text1">Get Advanced Inventory Management<br />in less resources.</div>
            </div>
            <div className="line"></div>
            <div className="stab">
                <div className="text2">Get More Efficient in work<br />by leaving Management on us.</div>
                <img loop className='limg' src='/timage.jpg'>
                </img>
            </div>
            <div className="line"></div>
            <div className="stab">
                <div className="stack">
                    <div className="tab"><p className='text'>How to SignIn?</p><button className='drop' title='drop-down' onClick={()=>settub1(!tub1)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button></div>
                    {tub1 && <div className='tub'>Signin button-login-don't have account-signup</div>}
                    <div className="tab"><p className='text'>How to Use?</p><button className='drop' title='drop-down' onClick={()=>settub2(!tub2)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button></div>
                    {tub2 && <div className='tub'>Add products on workspace by clicking on menu and items should have unique name</div>}
                    <div className="tab"><p className='text'>What is Inventory?</p><button className='drop' title='drop-down' onClick={()=>settub3(!tub3)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button></div>
                    {tub3 && <div className='tub'>Generally refers to a record/registry for keeping track of goods</div>}
                    <div className="tab"><p className='text'>Why do I use this?</p><button className='drop' title='drop-down' onClick={()=>settub4(!tub4)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button></div>
                    {tub4 && <div className='tub'>For ease of managing items</div>}
                    <div className="tab"><p className='text'>What are it's Features?</p><button className='drop' title='drop-down' onClick={()=>settub5(!tub5)}><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#ffffff"></path> </g></svg></button></div>
                    {tub5 && <div className='tub'>Can see items nearest to expiry and add and remove goods and can observe total bills</div>}
                </div>
            </div>
        </div>
    )
}

export default Land
