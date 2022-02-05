import {Link} from 'react-router-dom'

import location from '../images/location.png';
import truck from '../images/truck.png';
import bag from '../images/bag.png';
import phone from '../images/phone.png';
import logo from '../images/logo.png';
import '../css/navbar.css';
import '../themify-icons/themify-icons.css';

function Navbar() {
  return (
    <div className="Navbar">
       <nav className="header">
        <div className="menuIcon nav-item">          
          <i className="ti-menu"/>
        </div>
          <Link to='/'>
            <div className="headerLogo nav-item">
              <img src={logo} alt="logo"/>
            </div>
          </Link>
         <div className="locationList nav-item">
           <ul>
             <li>Hà Nội</li>
             <li>Hồ Chí Minh</li>
             <li>Đà Nẵng</li>
           </ul>
         </div>
         <div className="search nav-item">
           <input className="search" type="text" placeholder={`   Bạn muốn tìm gì...?`}/>
         </div>
         <div className="nav-item contact">
           <img src={phone} alt='phone' style={{float:'left'}}/>
           <span>Gọi mua hàng</span>
           <br/>    
          <span>18002097</span>
         </div>
          <Link to='/location' style={{ textDecoration: 'none' }}>
            <div className="nav-item location">
              <img src={location} alt='location' style={{float:'left'}}/>
              <span>Cửa hàng</span>
              <br/>    
              <span>gần bạn</span>
            </div>
          </Link>
          <Link to='/checkout' style={{ textDecoration: 'none' }}>
            <div className="nav-item truck">
              <img src={truck} alt='truck' style={{float:'left'}}/>
              <span>Tra cứu</span>
              <br/>    
              <span>đơn</span>
            </div>
          </Link>
          <Link to='/cart' style={{ textDecoration: 'none' }}>
            <div className="nav-item bag">
              <img src={bag} alt='bag' style={{float:'left'}}/>
              <span>Kiểm tra giỏ</span>
              <br/>    
              <span>hàng</span>
            </div>
          </Link>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className="nav-item member">
              <i className='ti-user' style={{fontSize:'27px', float:'left'}}/>
              <span>Đăng nhập</span>
            </div>
          </Link>
       </nav>
    </div>
  );
}

export default Navbar;
