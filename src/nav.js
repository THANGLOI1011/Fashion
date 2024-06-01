import React from 'react'
// import { AiOutlineUser } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import{ Link }from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import './nav.css'
const Nav = ({searchbtn,emptyCartCount }) => {
  const [ search, setSearch  ] = React.useState("");
  const { loginWithRedirect,logout, user, isAuthenticated  } = useAuth0();
  return (
    <div>
      
      <div className='main-header'>
            <div className='container'>
                <div className='logo'>
                  <Link to="/"><img srcSet='./img/logo-black@2x.png' alt='logo'></img></Link>
                    
                </div>
                <div className='search_box'>
                    <input type="text" value={search} placeholder='Search for products...' autoComplete='off' onChange={(e) => setSearch(e.target.value)} />
                    <button onClick={() => searchbtn(search)} >
                      <div className='icon-nav'><FiSearch /></div>
                    </button>

                </div>     
                <div className='icon-header'>
                  {
                        isAuthenticated && (
                          <div className='account'>
                          {/* <div className='user_icon'>
                          <AiOutlineUser />
                          </div> */}
                          <img src={user.picture} alt='img'></img>
                          <p>{user.name}</p>
                          </div>
                          )
                   }
                    <div className='second_icon'>
                      <div className='cart'>
                        <div className='cart-logo'>
                      <Link to='/cart' className='link'><FaShoppingCart /></Link>
                        </div>
                      <div className='quanlity-cart'>
                        <p>{emptyCartCount}</p>
                      </div>
                          
                      </div>
                      <div className='auth'>
            {
              isAuthenticated ? 
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                <div className='auth-login'>
                  <div className='auth-login-icon'><CiLogout></CiLogout></div>
                  <div className='auth-login-text'>LOGOUT</div>
                </div>
              </button>
              :
              <button onClick={() => loginWithRedirect()}>
                <div className='auth-login'>
                  <div className='auth-login-icon'><CiLogin></CiLogin></div>
                  <div className='auth-login-text'>LOGIN</div>
                </div>
              </button>
            }
          {/* <button onClick={() => loginWithRedirect()}><CiLogin/></button>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout/></button> */}
          </div>
          
                    </div>
                    </div>
            </div>
      </div>
      <div className='header'>
        <div className='container-main'>
          <div className='nav-header'>
            <div className='contact'>
              <ul>
                <li>
                  <Link to='/' className='link-contact'>Home</Link>
                </li>
                <li>
                  <Link to='/product' className='link-contact'>Product</Link>
                </li>
                <li>
                  <Link to='/about' className='link-contact'>About</Link>
                </li>
                <li>
                  <Link to='/contact' className='link-contact'>Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
          
          
      </div>

      
    </div>
  )
}

export default Nav
