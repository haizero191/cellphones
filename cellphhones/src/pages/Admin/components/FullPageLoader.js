import React, { useEffect } from 'react';
import loadingIcon from "../images/loadingIcon.gif";
import "../css/FullPageLoader.css";
import disableScroll from 'disable-scroll';

const FullPageLoader = ({isLoading}) => {
  useEffect(() => {
    if(isLoading)
      disableScroll.on()
    else 
      disableScroll.off()
  },[])
  return (
    isLoading?
      <div className='FullPageLoader'>
        <div className='loader-container'>
          <div className='loader'>
              <img src={loadingIcon}/>
          </div>
        </div>
      </div>
    :<></>
  );
};

export default FullPageLoader;
