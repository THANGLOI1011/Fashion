import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight, BsEye, BsCurrencyDollar } from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';
import { CiPercent } from 'react-icons/ci';
import { BiHeadphone } from 'react-icons/bi';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { ref, get, child } from 'firebase/database';
import db from './firebase';
import './home.css';
import './reponsive.css';

const Home = ({ detail, view, close, setClose, addtocart }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [Homeproduct, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, 'Homeproduct'));
        if (snapshot.exists()) {
          setHomeProducts(Object.values(snapshot.val()));
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeProducts();
  }, []);

  const handleViewMoreClick = () => {
    window.location.href = '/product';
  };

  return (
    <div>
      {close && (
        <div className='modal'>
          <div className='product-detail'>
            <div className='detail-container'>
              <button className='closebtn' onClick={() => setClose(false)}>
                <AiOutlineClose />
              </button>
              {detail.map((curElm) => (
                <div className='productsbox' key={curElm.id}>
                  <div className='detail detail-info'>
                    <h4 id='cat'>{curElm.Cat}</h4>
                    <h2 id='title'>{curElm.Title}</h2>
                    <p id='slogan'>{curElm.slogan}</p>
                    <h3 id='price'>${curElm.Price}</h3>
                    <button onClick={() => addtocart(curElm)}>Add To Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='top-banner'>
        <div className='container-home'>
          <div className='detail-home'>
            <Link to='/product' className='link-shopnow'>
              Shop Now
            </Link>
            <div className='arrow'>
              <BsArrowRight />
            </div>
          </div>
        </div>
      </div>
      <div className='product-type'>
        <h2>New Products</h2>
        <div className='container-product'>
          {['facewash.png', 'sp7.png', 'sp8.png', 'sp2.png'].map((imgSrc, index) => (
            <a key={index} href='/product' className='click-product'>
              <div className='box-product'>
                <div className='img-box-product'>
                  <img src={`./img/${imgSrc}`} alt='product'></img>
                </div>
                <div className='detail-product'>
                  <p>{`${index + 1} product`}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className='about'>
        <div className='about-container'>
          {[{ icon: <FiTruck />, title: 'Free shopping', desc: 'Order above $1000' },
          { icon: <BsCurrencyDollar />, title: 'Return & Refund', desc: 'Money Back Guarantee' },
          { icon: <CiPercent />, title: 'Member Discount', desc: 'On every Order' },
          { icon: <BiHeadphone />, title: 'Customer Support', desc: 'Every Time Support' }].map((item, index) => (
            <div className='about-box' key={index}>
              <div className='about-icon'>{item.icon}</div>
              <div className='about-detail'>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='product'>
        <h2>Top Products</h2>
        <div className='product-container'>
          {Homeproduct.map((curElm) => (
            <div onClick={() => view(curElm)} className='box-product-container' key={curElm.id}>
              <div className='box'>
                <div className='img-box'>
                  <img src={curElm.Img} alt={curElm.Title}></img>
                </div>
                <div className='icon'>
                  {isAuthenticated ? (
                    <li onClick={(e) => {
                      e.stopPropagation();
                      addtocart(curElm);
                    }}>
                      <AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li onClick={(e) => {
                      e.stopPropagation();
                      loginWithRedirect();
                    }}>
                      <AiOutlineShoppingCart />
                    </li>
                  )}
                  <li onClick={(e) => {
                    e.stopPropagation();
                    view(curElm);
                  }}>
                    <BsEye />
                  </li>
                  <li onClick={(e) => e.stopPropagation()}>
                    <AiOutlineHeart />
                  </li>
                </div>
                <div className='detail'>
                  <p>{curElm.Cat}</p>
                  <h3>{curElm.Title}</h3>
                  <h4>${curElm.Price}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='view-more'>
          <button onClick={handleViewMoreClick}>View More</button>
        </div>
      </div>
      <div className='banner'>
        <div className='banner-container'>
          <div className='banner-detail'>
            <h4>NEW PRODUCT LAUNCHED TO THE MARKET</h4>
            <h3>Set of 4 inshe brand products - 2024</h3>
            <p>$113</p>
            <Link to='/product' className='banner-link'>
              Shop Now
            </Link>
          </div>
          <div className='banner-img-box'>
            <img src='./img/sp4.png' alt='sliderimg'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
