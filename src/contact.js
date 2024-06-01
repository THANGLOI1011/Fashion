import React, { useState } from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom';
const Contact = () => {
  const [user,setUser] = useState({
    Name:'',
    Email:'' ,
    Message: '',
    Subject:''
  })
  let name,value
  const data = (e) => {
    name = e.target.name
    value= e.target.value
    setUser({...user, [name]: value})
  }
  const navigate = useNavigate();
  const senddata = async (e) =>{
    const {Name,Email,Subject,Message} = user;
    e.preventDefault()
    const options ={
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({Name,Email,Subject,Message})
    }
    const res = await fetch('https://ecommerce-contact-d0e59-default-rtdb.firebaseio.com/Message.json',options)
    console.log(res)
    if(res){
      alert('You Message sent')
      navigate('/');
    }
    else{ 
      alert('An error occured')

    }
    }
  return (
    <div>
      <div className='contact-container'>
        <div className='contact-contant'>
          <div className='contact-info'>
            <div className='contact-title'>
            <h2>Contact Us</h2>
            </div>
            <p>Need to get in touch with us? Either fill out the form with your inquiry or find the departmenty email you'd like to contact now!</p>
          </div>
            <div className='contact-form'>
                <form method='POST'>
                  <div className='contact-form-item'>
                    <p>Full name*</p>
                  <input type='text' name='Name' value={user.Name} placeholder='Enter your fullname' required autoComplete='off' onChange={data}></input>
                  </div>
                  <div className='contact-form-item'>
                    <p>Email</p>
                    <input type='email' name='Email' value={user.Email} placeholder='Enter your email' autoComplete='off' onChange={data}></input>
                  </div>
                  <div className='contact-form-item'>
                    <p>Subject</p>
                    <input type='text' name='Subject' value={user.Subject} placeholder='Enter your subject' autoComplete='off' onChange={data}></input>
                  </div>
                  <div className='contact-form-item'>
                    <p>Message</p>
                    <textarea name='Message' value={user.Message} placeholder='Your massage' autoComplete='off' onChange={data}></textarea>
                  </div>
                    
                    
                    
                    <button type='submit' onClick={senddata} >SEND</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
