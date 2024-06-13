import React from 'react'
import { RiFacebookFill } from 'react-icons/ri'
import { AiOutlineInstagram } from "react-icons/ai"
import { BiLogoYoutube } from "react-icons/bi";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
import './footer.css'
import './reponsive.css'

const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div className='footer-container'>
            <div className='footer-about'>
                <div className='footer-logo'>
                    <img srcSet='./img/logo-black@2x.png' alt='logo'></img>
                </div>
                <div className='footer-detail'>
                    <p>We are a team of design and developers that createe high quanlity</p>
                    <div className='footer-icon'>
                        <li><RiFacebookFill></RiFacebookFill></li>
                        <li><AiOutlineInstagram /></li>
                        <li><BiLogoYoutube /></li>
                        <li><AiOutlineTwitter /></li>
                    </div>
                </div>
            </div>
            <div className='footer-info'>
                <h3>INFO</h3>
                <ul>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Sell with us</li>
                    <li>Shipping policy</li>
                    <li>return</li>
                </ul>
            </div>
            <div className='footer-contact'>
                <h3>CONTACT US</h3>
                <ul>
                    <li>Available between 8AM to 8PM.Ready to answer your questions</li>
                    <li>Da Nang</li>
                    <li>contact.fashion@gmail.com</li>
                    <li><FaPhone /> (+84 123 323 222)</li>
                </ul>
            </div>
            <div className='footer-newsletter'>
                <h3>NEWSLETTER</h3>
                <ul>
                 <li>
                    <p>
                    Subscribe to get latest news update and informations
                    </p>
                 </li>
                 <div className='text-contact'>
                    <div className='text-input'>
                     <input type="text" placeholder='Add Email'/>
                    </div>
                    <button className='btn-contact'>Subscribe</button>
                 </div>
                </ul>
            </div>
        </div>
        {/* footer copyrigth */}
        <div className='copyright'>&copy;Copyright.designed and developed by Fashion </div>
      </div>
    </div>
  )
}

export default Footer
