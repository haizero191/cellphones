import React from 'react'
import {Link} from 'react-router-dom'
import bannerbottom1 from '../images/banner-bottom1.png'


function BannerBottom() {
    return (
        <div>
            <div className="banner-item">
                <Link to="/">
                    <img src={bannerbottom1} alt="Banner bottom 1" className="banner-item__img" style={{
                        height:'124.3px',
                        margin:'10px 7px',
                        borderRadius:'1rem',
                        boxShadow: 'rgb(60 64 67 / 10%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px'
                    }}/>
                </Link>
                <Link to="/">
                    <img src='https://cellphones.com.vn/media/icons/banner/banner-sis-samsung-homepage.png' alt="Banner bottom 1" className="banner-item__img" style={{
                        height:'124.3px',
                        margin:'10px 7px',
                        borderRadius:'1rem',
                        boxShadow: 'rgb(60 64 67 / 10%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px'
                    }}/>
                </Link>
                <Link to="/">
                    <img src='https://cellphones.com.vn/media/icons/banner/banner-sis-asus-homepage.png' alt="Banner bottom 1" className="banner-item__img" style={{
                        height:'124.3px',
                        margin:'10px 7px',
                        borderRadius:'1rem',
                        boxShadow: 'rgb(60 64 67 / 10%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px'
                    }}/>
                </Link>
                <Link to="/">
                    <img src='https://cellphones.com.vn/media/icons/banner/banner-sis-xiaomi-homepage.png' alt="Banner bottom 1" className="banner-item__img" style={{
                        height:'124.3px',
                        margin:'10px 7px',
                        borderRadius:'1rem',
                        boxShadow: 'rgb(60 64 67 / 10%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px'
                    }}/>
                </Link>
            </div>
        </div>
    )
}

export default BannerBottom
