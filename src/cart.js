
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './cart.css';
import { FaCircleCheck } from "react-icons/fa6";
import db from './firebase';
import { ref, push } from 'firebase/database';

const Cart = ({ cart, setCart }) => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false); // State để kiểm soát việc hiển thị lịch sử giao dịch

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setShowCardInfo(event.target.value === 'bankTransfer');
  };

  const handleClosebtn = () => {
    setCart([]);
    window.location.reload();
  };

  const incqty = (product) => {
    const exsit = cart.find((x) => x.id === product.id);
    setCart(cart.map((curElm) => curElm.id === product.id ? { ...exsit, qty: exsit.qty + 1 } : curElm));
  };

  const decqty = (product) => {
    const exsit = cart.find((x) => x.id === product.id);
    setCart(cart.map((curElm) => curElm.id === product.id ? { ...exsit, qty: exsit.qty - 1 } : curElm));
  };

  const removeproduct = (product) => {
    setCart(cart.filter((x) => x.id !== product.id));
  };

  const handleContinueButtonClick = () => {
    setShowCustomerInfo(true);
  };

  const handleCheckout = async () => {
    if (customerInfo.name && customerInfo.email && customerInfo.address && customerInfo.phone && paymentMethod) {
      const newOrder = {
        customer: customerInfo,
        products: cart,
        totalPrice: Totalprice,
        createdAt: new Date().toLocaleString(),
        status: 'Ordered',
        paymentMethod: paymentMethod,
        cardInfo: paymentMethod === 'bankTransfer' ? cardInfo : null
      };

      try {
        const transactionHistoryRef = ref(db, 'transactionHistory');
        await push(transactionHistoryRef, newOrder);

        setTransactionHistory([...transactionHistory, newOrder]);
        setCart([]);
        setCustomerInfo({
          name: '',
          email: '',
          address: '',
          phone: ''
        });
        setCardInfo({
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        });
        setPaymentMethod('');
        setShowCustomerInfo(false);
        setShowTransactionHistory(true); // Hiển thị trang lịch sử giao dịch sau khi nhấn "Checkout"
        alert("Order has been placed successfully!");
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    } else {
      alert("Please fill in complete customer information and select a payment method!");
    }
  };

  const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0);

  return (
    <div>
      <div className='cart-container'>
        {cart.length === 0 && !showTransactionHistory && (
          <div className='empty-cart'>
            <h2 className='empty'>Cart is Empty</h2>
            <Link to='/product' className='emptycart-btn'>Shop now</Link>
          </div>
        )}
        <div className='cart-container-contant'>
          {!showCustomerInfo && !showTransactionHistory && (
            <>
              {cart.map((curElm) => (
                <div className='cart-container-info' key={curElm.id}>
                  <div className='cart-contant'>
                    <div className='cart-item'>
                      <div className='cart-img-box'>
                        <img src={curElm.Img} alt={curElm.Title}></img>
                      </div>
                      <div className="cart-detail">
                        <div className='info'>
                          <h4>{curElm.Cat}</h4>
                          <h3>{curElm.Title}</h3>
                          <p>Price: ${curElm.Price}</p>
                          <div className='qty'>
                            <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                            <input type='text' value={curElm.qty} readOnly></input>
                            <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                          </div>
                          <h4 id='subtotal'>sub total: ${curElm.Price * curElm.qty}</h4>
                        </div>
                        <div className='close'>
                          <button onClick={() => removeproduct(curElm)}><AiOutlineClose /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <div className='checkout-container'>
                  <button className='checkout' onClick={handleContinueButtonClick}>Continue</button>
                </div>
              )}
            </>
          )}
        </div>

        {showCustomerInfo && !showTransactionHistory && (
          <>
            <div className='form-payment'>
              <div className='customer-form'>
                <h2>Customer Information</h2>
                <div className='form-group'>
                  <label>Full Name</label>
                  <input placeholder='Enter your Full Name' type='text' name='name' value={customerInfo.name} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <input placeholder='Enter your Number' type='text' name='phone' value={customerInfo.phone} onChange={handleInputChange}></input>
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input placeholder='Enter your Email' type='email' name='email' value={customerInfo.email} onChange={handleInputChange} />
                </div>
                <div className='form-group'>
                  <label>Address</label>
                  <input placeholder='Enter your Address' name='address' value={customerInfo.address} onChange={handleInputChange}></input>
                </div>
                <div className='form-group'>
                  <label>Payment Method</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={handlePaymentMethodChange}
                      />
                      Cash
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={handlePaymentMethodChange}
                      />
                      COD
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankTransfer"
                        checked={paymentMethod === 'bankTransfer'}
                        onChange={handlePaymentMethodChange}
                      />
                      Bank Transfer
                    </label>
                  </div>
                </div>
                {showCardInfo && (
                  <div className='card-info'>
                    <div className='form-group'>
                      <label>Card Number</label>
                      <input placeholder='Enter Card Number' type='text' name='cardNumber' value={cardInfo.cardNumber} onChange={handleCardInputChange} />
                    </div>
                    <div className='form-group'>
                      <label>Expiry Date</label>
                      <input placeholder='MM/YY' type='text' name='expiryDate' value={cardInfo.expiryDate} onChange={handleCardInputChange} />
                    </div>
                    <div className='form-group'>
                      <label>CVV</label>
                      <input placeholder='Enter CVV' type='text' name='cvv' value={cardInfo.cvv} onChange={handleCardInputChange} />
                    </div>
                  </div>
                )}
              </div>
              <div className='cart-contant-after-info'>
                <h2>My Cart</h2>
                <div className='cart-contant cart-contant-after'>
                  {cart.map((curElm) => (
                    <div className='cart-item cart-item-after' key={curElm.id}>
                      <div className='cart-img-box cart-img-box-after'>
                        <img src={curElm.Img} alt={curElm.Title}></img>
                      </div>
                      <div className="cart-detail cart-detail-after">
                        <div className='info info-payment'>
                          <h4>{curElm.Cat}</h4>
                          <h3>{curElm.Title}</h3>
                          <p>Price: ${curElm.Price}</p>
                          <p>x{curElm.qty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {cart.length > 0 && (
              <>
                <h2 className='totalprice'> Total: $ {Totalprice} </h2>
                <div className='checkout-container'>
                  <button className='checkout' onClick={handleCheckout}>CheckOut</button>
                </div>
              </>
            )}
          </>
        )}

        {showTransactionHistory && (
          <div className="transaction-history">
            
            {transactionHistory.map((order, index) => (
              <ul key={index}>
                <li>
                  <div className='history-icon'>
                    <FaCircleCheck />
                    <div>
                      <button className='close-btn' onClick={handleClosebtn}><AiOutlineClose /></button>
                    </div>
                  </div>
                  {order && order.customer && (
                    <>
                      {transactionHistory.length > 0 && (
              <h2>Transaction History</h2>
            )}
                      <p id='status'>Status: {order.status}</p>
                      <p>Order placed on: {order.createdAt}</p>
                      <p>Customer: {order.customer.name}</p>
                      <p>PhoneNumber: {order.customer.phone}</p>
                      <p>Email: {order.customer.email}</p>
                      <p>Address: {order.customer.address}</p>
                      <p>Payment Method: {order.paymentMethod}</p>
                      {order.paymentMethod === 'bankTransfer' && (
                        <>
                          <p>Card Number: {order.cardInfo.cardNumber}</p>
                          <p>Expiry Date: {order.cardInfo.expiryDate}</p>
                          <p>CVV: {order.cardInfo.cvv}</p>
                        </>
                      )}
                      <p>Total Price: ${order.totalPrice}</p>
                      <div>
                        {order.products.map((product, index) => (
                          <p key={index}>{product.Title} - Qty: {product.qty}</p>
                        ))}
                      </div>
                    </>
                  )}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

