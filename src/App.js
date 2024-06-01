import React, { useState, useEffect } from 'react';
import Nav from './nav';
import { BrowserRouter } from "react-router-dom";
import Router from './rout';
import Footer from './footer';
import { ref, child, get } from "firebase/database";
import db from './firebase';

const App = () => {
  const [cart, setCart] = useState([]);
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState([]);
  const [product, setProduct] = useState([]);

  // Fetch product details from Firebase
  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `Productdetail`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productArray = Array.isArray(data) ? data : Object.values(data);
        setProduct(productArray);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  // Search product
  const searchbtn = (category) => {
    const filteredProducts = product.filter((item) => item.Cat === category);
    setProduct(filteredProducts);
  };

  // View product detail
  const view = (product) => {
    setDetail([{ ...product }]);
    setClose(true);
  };

  // Add to cart
  const addtocart = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      alert("This Product is already added to cart");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert("Product is added to cart");
    }
  };

  const emptyCartCount = cart.length;

  return (
    <div>
      <BrowserRouter>
        <Nav searchbtn={searchbtn} emptyCartCount={emptyCartCount} />
        <Router
          product={product}
          setProduct={setProduct}
          detail={detail}
          view={view}
          close={close}
          setClose={setClose}
          cart={cart}
          setCart={setCart}
          addtocart={addtocart}
          
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
