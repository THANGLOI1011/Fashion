import React, { useState, useEffect } from 'react';
import { BsEye } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import './product.css';
import './reponsive.css';
import { ref, get, child } from 'firebase/database';
import { IoIosArrowDown } from "react-icons/io";
import db from './firebase'; // Import your Firebase database instance

const Product = ({ setProduct, Productdetail = [], detail, view, close, setClose, addtocart }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCategory, setShowCategory] = useState(false); // State to manage category visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 739); // Check initial window width

  useEffect(() => {
    // Fetch product data from Firebase
    const fetchProducts = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, 'Productdetail'));
        if (snapshot.exists()) {
          const productList = Object.values(snapshot.val());
          setProducts(productList); // Store full product list
          setFilteredProducts(productList); // Initially show all products
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();

    // Add event listener to update isMobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 739);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filterProductByCategory = (category) => {
    if (products && Array.isArray(products)) {
      if (category === 'All Products') {
        setFilteredProducts(products);
      } else {
        const filteredProducts = products.filter((product) => product.Cat === category);
        setFilteredProducts(filteredProducts);
      }
    } else {
      console.error('Products is not defined or not an array');
    }
  };

  const viewProductDetail = (product) => {
    setSelectedProduct(product);
    setClose(true);
  };

  return (
    <div>
      {close && selectedProduct && (
        <div className='modal'>
          <div className='product-detail'>
          <div className='detail-container'>
            <button className='closebtn' onClick={() => setClose(false)}><AiOutlineClose /></button>
            <div className='productsbox'>
              <div className='detail detail-info'>
                <h4 id='cat'>{selectedProduct.Cat}</h4>
                <h2 id='title'>{selectedProduct.Title}</h2>
                <p id='slogan'>{selectedProduct.slogan}</p>
                <h3 id='price'>${selectedProduct.Price}</h3>
                <div className='detail-info-btn'>
                  <button className='buynow' onClick={() => addtocart(selectedProduct)}>Buy Now</button>
                  <button onClick={() => addtocart(selectedProduct)}>Add To Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
      <div className='products'>
        <h2>Product</h2>
        <div className='products-container'>
          {/* Products filter section */}
          <div className='products-filter'>
            <div 
              className={`products-category ${isMobile && showCategory ? 'show' : ''}`}
              onClick={() => isMobile && setShowCategory(!showCategory)}
            >
              <div className='product-category-name'>
                <h3>Category</h3>
                <div className='icon-down'><IoIosArrowDown /></div>
              </div>
              <ul>
                <li onClick={() => filterProductByCategory('All Products')}>All Products</li>
                <li onClick={() => filterProductByCategory('Faberlic')}>Faberlic</li>
                <li onClick={() => filterProductByCategory('PericonMD')}>PericonMD</li>
                <li onClick={() => filterProductByCategory('Nivia')}>Nivia</li>
                <li onClick={() => filterProductByCategory('Inshe')}>Inshe</li>
                <li onClick={() => filterProductByCategory('Branch')}>Branch</li>
              </ul>
            </div>
            {/* Products display section */}
            <div className='productsbox-product'>
              <div className='productsbox-content'>
                {filteredProducts.map((curElm) => (
                  <div className='box-product-container' key={curElm.id}>
                    <div className='box-productsdetail'>
                      <div className='imgbox-productdetail'>
                        <img src={curElm.Img} alt={curElm.Title}></img>
                      </div>
                      <div className='icon-productsdetail'>
                        {isAuthenticated ? (
                          <li onClick={() => addtocart(curElm)}><AiOutlineShoppingCart /></li>
                        ) : (
                          <li onClick={() => loginWithRedirect()}><AiOutlineShoppingCart /></li>
                        )}
                        <li onClick={() => viewProductDetail(curElm)}><BsEye /></li>
                        <li><AiOutlineHeart /></li>
                      </div>
                      <div className='detail-productsdetail'>
                        <p>{curElm.Cat}</p>
                        <h3>{curElm.Title}</h3>
                        <h4>${curElm.Price}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
