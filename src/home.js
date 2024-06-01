import React, { useState, useEffect } from 'react';
import './home.css'
import  { Link } from "react-router-dom"
import { BsArrowRight }  from 'react-icons/bs';
import { FiTruck }  from 'react-icons/fi';
import { BsCurrencyDollar } from "react-icons/bs";
import { CiPercent } from "react-icons/ci";
import { BiHeadphone } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart,AiOutlineClose } from "react-icons/ai";
import { ref, get, child } from 'firebase/database';
import db from './firebase';


const Home = ({detail,view,close,setClose,addtocart}) => {
    const {isAuthenticated,loginWithRedirect  } = useAuth0();
    const [Homeproduct, setHomeProducts] = useState([]);
    useEffect(() => {
        // Fetch home product data from Firebase
        const fetchHomeProducts = async () => {
          const dbRef = ref(db);
          try {
            const snapshot = await get(child(dbRef, 'Homeproduct'));
            if (snapshot.exists()) {
              setHomeProducts(Object.values(snapshot.val())); 
            } else {
              console.log("No data available");
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchHomeProducts();
      }, []);

  return (
    <div>
        {
            close ? <div className='product-detail'>
            <div className='detail-container'>
                <button className='closebtn' onClick={() => setClose(false)}><AiOutlineClose /></button>
                {
                    detail.map((curElm) =>{
                        return(
                            <div className='productsbox'>
                                <div className='img-box'>
                                    <img src={curElm.Img} alt={curElm.Title}></img>
                                </div>
                                <div className='detail detail-info'>
                                    <h4 id='cat'>{curElm.Cat}</h4>
                                    <h2 id='title'>{curElm.Title}</h2>
                                    <p id='slogan'>{curElm.slogan}</p>
                                    <h3 id='price'>${curElm.Price}</h3>
                                    <button onClick={() => addtocart(curElm)}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div> : null
        }
        <div className='top-banner'>
            <div className='container-home'>
                <div className='detail-home'>
                    <Link to='/product' className='link-shopnow'>Shop Now</Link>
                    <div className='arrow'><BsArrowRight/></div>
                </div>
                {/* <div className='img-box-home'>
                    <img src='https://hali.vn/wp-content/uploads/2020/07/thiet-ke-banner-my-pham34-e1594687755631.jpg' alt='sliderimg'></img>
                </div> */}
            </div>
        </div>
        <div className='product-type'>
            <div className='container-product'>
                {/* san pham 1 */}
                <a href='/product' className='click-product'>
                <div className='box-product'>
                    <div className='img-box-product'>
                        <img src='./img/facewash.png' alt='mobile'></img>
                    </div>
                    <div className='detail-product'>
                        <p>23 product</p>
                    </div>
                </div>
                </a>
            {/* san pham 2 */}
            <a className='click-product' href='/product'>
                <div className='box-product'>
                    <div className='img-box-product'>
                        <img src='./img/sp7.png' alt='mobile'></img>
                    </div>
                    <div className='detail-product'>
                        <p>11 product</p>
                    </div>
                </div>
            </a>
                 {/* san pham 3 */}
                 <a className='click-product' href='/product'>
                    <div className='box-product'>
                        <div className='img-box-product'>
                            <img src='./img/sp8.png' alt='mobile'></img>
                        </div>
                        <div className='detail-product'>
                            <p>12 product</p>
                        </div>
                    </div>
                </a>
                 {/* san pham 4 */}
                 <a className='click-product' href='/product'>
                    <div className='box-product'>
                    <div className='img-box-product'>
                        <img src='./img/sp2.png' alt='mobile'></img>
                    </div>
                    <div className='detail-product'>
                        <p>56 product</p>
                    </div>
                    </div>
                 </a>
                 {/* san pham 5 */}
                 <a className='click-product' href='/product'>
            <div className='box-product'>
                    <div className='img-box-product'>
                        <img src='./img/sp6.png' alt='mobile'></img>
                    </div>
                    <div className='detail-product'>
                        <p>93 product</p>
                    </div>
                </div>
                 </a>
            </div>
        </div>
        <div className='about'>
            <div className='about-container'>
                {/* 1 */}
                <div className='about-box'>
                    <div className='about-icon'>
                        <FiTruck></FiTruck>
                    </div>
                    <div className='about-detail'>
                        <h3>Free shopping</h3>
                        <p>Oder above $1000</p>
                    </div>
                </div>
                {/* 2 */}
                <div className='about-box'>
                    <div className='about-icon'>
                        <BsCurrencyDollar />
                    </div>
                    <div className='about-detail'>
                        <h3>Return & Refund</h3>
                        <p>Money Back Gaurenty</p>
                    </div>
                </div>
                {/* 3 */}
                <div className='about-box'>
                    <div className='about-icon'>
                    <CiPercent />
                    </div>
                    <div className='about-detail'>
                        <h3>Member Discount</h3>
                        <p>On every Oder</p>
                    </div>
                </div>
                {/* 4 */}
                <div className='about-box'>
                    <div className='about-icon'>
                    <BiHeadphone />
                    </div>
                    <div className='about-detail'>
                        <h3>Customer Support</h3>
                        <p>Every Time Support</p>
                    </div>
                </div>
            </div>
        </div>
        {/* product */}
        <div className='product'>
            <h2>Top Products</h2>
            <div className='product-container'>
            {
                Homeproduct.map((curElm) => {
                    return(
                        
                        <div className='box' key={curElm.id}> 
                            <div className='img-box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='icon'>
                            {
                                isAuthenticated ? 
                                <li onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></li>
                                    :
                                <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                             }
                                <li  onClick={() => view(curElm)}> <BsEye /></li>
                                <li> <AiOutlineHeart /></li>
                               
                            </div>

                            <div className='detail'>
                                <p>{curElm.Cat}</p>
                                <h3>{curElm.Title}</h3>
                                <h4>${curElm.Price}</h4>
                            </div>
                        </div>   
                    )
                })
            
            }
                
            </div>
        </div>
        {/* banner */}
        <div className='banner'>
            <div className='banner-container'>
            <div className='banner-detail'>
                <h4>NEW PRODUCT LAUNCHED TO THE MARKET</h4>
                <h3>Set of 4 inshe brand products - 2024</h3>
                <p>$113</p>
                <Link to='/product' className='banner-link'>Shop Now</Link>
            </div>
            <div className='banner-img-box'>
                <img src='./img/sp4.png' alt='sliderimg'></img>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home
