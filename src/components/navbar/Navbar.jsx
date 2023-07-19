import React, {useState} from 'react';
import logo from '../../assets/gtalentpro-logo.png';
import profile from '../../assets/profile.webp';
import rudhra from '../../assets/rudhra.jpg';
import './navbar.css';

function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);
    function handleMouseEnter() {
        setShowDropdown(true);
      }
    
      function handleMouseLeave() {
        setShowDropdown(false);
      }
  return (
    <div className='navbar'>
        <img src={logo} alt="logo" className='logo-img'/>
        <div style={{display: 'flex'}}>
        <div className='menu'>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>Resume templates</a></li>
                <li><a href='#'>Pricing</a></li>
            </ul>
        </div>
        <div className='navbar-right'>
            {/* <div><button >My Document</button></div> */}
            {/* <div>
                   <a href='http://localhost:3002/'><button className="get-btn">
                    My Document </button></a>
            </div> */}
          
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img
        src={ rudhra }
        alt="Profile"
      />
   { showDropdown && (
     <div className="dropdown-menubar">
     <ul>
       <li >Logout</li>
       <li >My Page</li>
     </ul>
   </div>

   )}
       
  
            </div>
        </div>

        </div>
       
      
    </div>
  )
}

export default Navbar