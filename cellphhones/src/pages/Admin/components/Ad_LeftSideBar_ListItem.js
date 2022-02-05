import React, { useEffect, useState } from 'react'
import { NavLink  } from 'react-router-dom';
import "../css/Ad_LeftSideBar_ListItem.css";

const Ad_LeftSideBar_ListItem = ({data}) => {
    const [isDrop, setIsDrop] = useState(false)

    const handleClick = () => {
        setIsDrop(isDrop => !isDrop);
    }

    useEffect(() => {
    },[])

    return (
        <div className='Ad_LeftSideBar_ListItem'>
            <div className='container' onClick={handleClick}>
                <div className='left-content'>
                    <div className='icon'>
                        <img src={data.icon}/>
                    </div>
                    <div className='text'>
                        <p>{data.name}</p>
                    </div>
                </div>
                <div className='right-content'>
                    <div className={`icon ${isDrop?'rotate': ''}`}>
                        <img src="https://img.icons8.com/material-rounded/60/000000/expand-arrow--v1.png"/>
                    </div>
                </div>
            </div>
            <div className={`menu-detail ${isDrop ? 'dropdown': ''}`}>
                <ul>
                    {
                        data.children.map((item,index) => {
                            let selectName = data.name.toLowerCase();
                            let viewName = item.childName.toLowerCase();
                            return <NavLink  
                                    to={`/admin/${selectName}?view=${viewName}`}  
                                    key={index}>
                                        <li>{item.childName}</li>
                                    </NavLink>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Ad_LeftSideBar_ListItem
