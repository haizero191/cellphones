import React from 'react'
import '../css/subbanner.css'

function SubBanner(props) {
    return (
        <div>
           <div className='sub-banner-section'>
            <img src={props.src} alt='bannerRight' style={{width:'100%', height:'100%', borderRadius:'1rem'}}/>
        </div>
        </div>
    )
}

export default SubBanner
