import React from 'react'
import './about.css'
const About = () => {
  return (
    <div>
        <div className='abouts'>
          <div className='abouts-container'>
            <div className='about-container-title'>
              <p>"Elevate Your Beauty to New Heights with the Ultimate in Luxury European Cosmetics"</p>
            </div>
            <div className='abouts-container-info'>
              <h2>ABOUT US</h2>
              <p>Welcome to a world where beauty meets sophistication, where every product embodies 
                the timeless elegance and innovation of European skincare and makeup. Our premium cosmetics 
                line, crafted with the finest ingredients and cutting-edge technology, offers a luxurious experience 
                that redefines beauty standards.
                </p>
            </div>
            <div className='abouts-container-image'>

            <h2 className='typical'>TYPICAL PRODUCTS</h2>
            <div className='abouts-container-img'>
              <div className='abouts-container-img-contant'>
                <div className='abouts-container-img-item'>
                  <img src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1601476423631-SY6N56SXJBX2ZGIWXCVF/image-asset.jpeg' alt='img-abouts'></img>
                </div>
              </div>
              <div className='abouts-container-img-contant'>
                <div className='abouts-container-img-item'>
                  <img src='https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1593191159111-R1NLP671WL9OV675YFAS/chup-anh-san-pham-maki-studio-14.jpg' alt='img-abouts'></img>
                </div>
              </div>
              <div className='abouts-container-img-contant'>
                <div className='abouts-container-img-item'>
                  <img src='https://thuvien.hocviennhiepanh.com/wp-content/uploads/cosmetic.jpg' alt='img-abouts'></img>
                </div>
              </div>
            </div>
            </div>
            <div className='abouts-container-customer'>
              <h2>ABOUT CUSTOMER</h2>
              <p>We invite you to discover the transformative power of our premium cosmetics. Experience the perfect blend of nature and science, tradition and innovation, luxury and sustainability. 
                Our products are crafted with care and precision to help you look and feel your best, every day.</p>
            </div>
            <div className='banner-img'>
            <img src='https://dw0i2gv3d32l1.cloudfront.net/uploads/stage/stage_image/20199/optimized_product_thumb_placeit__4_.jpg' alt='banner'></img>
            </div>
          </div>
        </div>
    </div>
  )
}

export default About
