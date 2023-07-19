import React from 'react';
import logo from '../../assets/gtalentpro-logo.png';
import { UploadOutlined } from '@ant-design/icons';
import ss1 from '../../assets/t1.png';
import ss2 from '../../assets/t2.png';
import ss3 from '../../assets/t03.png';
import pdf from '../../assets/pdf3.png';
import './home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import rudhra from '../../assets/rudhra.jpg';
import { Button } from 'antd';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Home() {

const navigate = useNavigate();
 useEffect (() => {
  if(localStorage.getItem("resUser_id") == ''){
    navigate('/login');
  }
 })

 const handleResume = () => {
    navigate('/profile');

 }
  return (
    <div>
        {/* <div className='navbar'>
        <img src={logo} alt="logo" className='logo-img'/>
        <div className='navbar-right'>    
               <img
                   src={rudhra}
                   alt="Profile"
               />
       </div>

        </div> */}
        <Navbar />
        <div className='container'>
        <div className='row col-md-12'>
          <div className='resume-edit'>
            <div><h1 className='home-head'>Dashboard</h1></div>
            <div className='upload-btn-container'><Button type="primary" icon={<UploadOutlined />} className='start-btn' onClick={handleResume}>Update Resume</Button></div>
          </div>
          <div className='col-md-6'>
             <div className='col-md-6' style={{float: 'left'}}>
                 <img className='pdf-img' src={pdf} alt="Profile" />
             </div>
             <div className='col-md-6 home-text' style={{float: 'left'}}>
                <p className='home-titleName'>Untitled</p>
                <p className='update-date'>Updated 7 July, 16:52</p>
                <div className='home-links'>
                    <a href="/profile"><i class="fas fa-edit"></i> Edit</a>
                    <a><i class="fas fa-download"></i> Download PDF</a>
                </div>
                
             </div>
          </div>
          <div className='col-md-6'>
             
          </div>
       </div>
        <div className='row boost-career'>
            <h1 className='home-head' style={{marginBottom: '25px'}}>Boost Your Career</h1>
            <div className='row' >
            <div className='col-md-4 ss1'>
              <div className='card'>
                <div className='card-body ss-body' style={{ width: '100%', textAlign: 'center'}}>
                    <img className='ss1-img' src={ss1} alt="Profile" />
                    <h4 className='ss-h4'>Creative Resume Template</h4>
                    <p>A resume template as creative as your imagination</p> 
                    <Button type="primary" className='start-btn' onClick={handleResume}>Get Started</Button>
                 </div>
              </div>  
              {/* <div className='template-bottom'>
                       
              </div>    */}
            </div>
           <div className='col-md-4 ss2'>
            <div className='card'>
                <div className='card-body ss-body' style={{ width: '100%', textAlign: 'center'}}>
                    <img className='ss2-img' src={ss2} alt="ss1" />
                    <h4 className='ss-h4'>Professional Resume template</h4>
                    <p>Put your best foot forward with a professional resume template</p>
                    <Button type="primary" className='start-btn' onClick={handleResume}>Get Started</Button>
                </div>
            </div>
            {/* <div className='template-bottom'>
              
            </div>    */}
          </div>
          <div className='col-md-4 ss2'>
            <div className='card'>
                <div className='card-body ss-body' style={{ width: '100%', textAlign: 'center'}}>
                    <img className='ss2-img' src={ss3} alt="ss3" />
                    <h4 className='ss-h4'>Chronological resume template</h4>
                    <p> Emphasizes career progression for those with a stable work history.</p>
                    <Button type="primary" className='start-btn' onClick={handleResume}>Get Started</Button>
                </div>
            </div>
            {/* <div className='template-bottom'>
              
            </div>    */}
          </div>


            </div>

            

        </div>

        </div>

       
     <Footer />
       
      
    </div>
  )
}

export default Home