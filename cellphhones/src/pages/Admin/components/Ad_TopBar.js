import React, { useEffect } from 'react'
import "../css/Ad_TopBar.css";
import logo from "../images/logo.jpg";


const Ad_TopBar = ({select,view}) => {
    useEffect(()=> {
     
    })
    return (
        <div className='Ad_TopBar'>
            <div className='container'>
                <div className='left-content'>
                    <div className='logo'>
                        <img src={logo}/>
                    </div>
                    <div className='current-select'>
                        <p>{select}</p>
                        <p>/</p>
                        <p>{view}</p>
                    </div>
                </div>
                <div className='right-content'>
                    <div className='notification'>
                        <div className='number-ring'>
                            0
                        </div>
                        <img src="https://img.icons8.com/external-tulpahn-detailed-outline-tulpahn/64/000000/external-notification-mobile-user-interface-tulpahn-detailed-outline-tulpahn.png"/>
                    </div>
                    <div className='account'>
                        <div className='info'>
                            <div className='name'>Nguyen Hai</div>
                            <div className='role'>Admin</div>
                        </div>
                        <div className='avatar'>
                            <img />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ad_TopBar
