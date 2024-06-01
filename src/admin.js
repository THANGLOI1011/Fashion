import React, { useState, useEffect } from 'react';
import { ref, get, child, set, remove, push } from 'firebase/database';
import db from './firebase';
import './admin.css';

const AdminPanel = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([{ Img: '', Title: '', Cat: '', Price: '', slogan: '', quantity: 1 }]);
  const [editProduct, setEditProduct] = useState(null);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const transactionHistoryRef = ref(db, 'transactionHistory');
      try {
        const snapshot = await get(transactionHistoryRef);
        if (snapshot.exists()) {
          const transactionHistoryData = snapshot.val();
          const transactionHistoryArray = Object.keys(transactionHistoryData).map(key => ({
            id: key,
            ...transactionHistoryData[key]
          }));
          setTransactionHistory(transactionHistoryArray);
        } else {
          console.log("No transaction history available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, 'Productdetail'));
        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsArray = Object.keys(productsData).map(key => ({
            id: key,
            ...productsData[key]
          }));
          setProducts(productsArray);
          setTotalProductsCount(productsArray.length);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactionHistory();
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    const dbRef = ref(db, 'Productdetail');
    try {
      const newProductsData = newProducts.map(async (product) => {
        const newProductRef = push(dbRef);
        const productWithInfo = {
          ...product,
          created_at: new Date().toISOString(),
          category: 'Your_Category',
        };
        await set(newProductRef, productWithInfo);
        return productWithInfo;
      });

      const addedProducts = await Promise.all(newProductsData);

      const productsWithQuantity = addedProducts.flatMap(product =>
        Array.from({ length: product.quantity }, () => ({ ...product }))
      );
      setProducts([...products, ...productsWithQuantity]);
      setTotalProductsCount(totalProductsCount + addedProducts.length);
      setNewProducts([{ Img: '', Title: '', Cat: '', Price: '', slogan: '', quantity: 1 }]);
      setShowAddProductForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = async () => {
    const dbRef = ref(db, `Productdetail/${editProduct.id}`);
    try {
      await set(dbRef, editProduct);
      const updatedProducts = products.map(product =>
        product.id === editProduct.id ? editProduct : product
      );
      setProducts(updatedProducts);
      setEditProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const dbRef = ref(db, `Productdetail/${id}`);
    try {
      await remove(dbRef);
      setProducts(products.filter(product => product.id !== id));
      setTotalProductsCount(totalProductsCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewProductChange = (index, field, value) => {
    const updatedProducts = newProducts.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setNewProducts(updatedProducts);
  };

  const handleCreateButtonClick = () => {
    setShowAddProductForm(true);
  };
  return (
    <div className='admin-panel-all'>
      <h1>Admin Dashboard</h1>
      <div className="transaction-history-container">
          <h2>Transaction History</h2>
          <div className="transaction-list">
            {transactionHistory.map((order) => (
              <div key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p>Customer: {order.customer.name}</p>
                <p>Order placed on: {order.createdAt}</p>
                <p>Status: {order.status}</p>
                <p>Total Price: ${order.totalPrice}</p>
                <button onClick={() => console.log('View order details')}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      <div className="admin-panel">
        <div className="product-management-container">
          <h2>Product Management</h2>
          <div className="product-list-info">
            <h3>Products</h3>
            <p>Total Products: {totalProductsCount}</p>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.Img} alt={product.Title} />
                <h3>{product.Title}</h3>
                <p>{product.Cat}</p>
                <p id='price'>${product.Price}</p>
                <p id='slogan'>{product.slogan}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Created At: {new Date(product.created_at).toLocaleString()}</p>
                <button id='edit' onClick={() => setEditProduct(product)}>Edit</button>
                <button id='delete' onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            ))}
          </div>
          {showAddProductForm && (
            <div className="add-product">
              {newProducts.map((product, index) => (
                <div key={index} className="new-product-item">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={product.Img}
                    onChange={(e) => handleNewProductChange(index, 'Img', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={product.Title}
                    onChange={(e) => handleNewProductChange(index, 'Title', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={product.Cat}
                    onChange={(e) => handleNewProductChange(index, 'Cat', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={product.Price}
                    onChange={(e) => handleNewProductChange(index, 'Price', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Slogan"
                    value={product.slogan}
                    onChange={(e) => handleNewProductChange(index, 'slogan', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => handleNewProductChange(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
              ))}
              <button onClick={handleAddProduct}>Add Products</button>
            </div>
          )}
          {!showAddProductForm && (
            <button id='create' onClick={handleCreateButtonClick}>Create</button>
          )}
          {editProduct && (
            <div className="edit-product">
              <h3>Edit Product</h3>
              <input
                type="text"
                placeholder="Image URL"
                value={editProduct.Img}
                onChange={(e) => setEditProduct({ ...editProduct, Img: e.target.value })}
              />
              <input
                type="text"
                placeholder="Title"
                value={editProduct.Title}
                onChange={(e) => setEditProduct({ ...editProduct, Title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={editProduct.Cat}
                onChange={(e) => setEditProduct({ ...editProduct, Cat: e.target.value })}
              />
              <input
                type="text"
                placeholder="Price"
                value={editProduct.Price}
                onChange={(e) => setEditProduct({ ...editProduct, Price: e.target.value })}
              />
              <input
                type="text"
                placeholder="Slogan"
                value={editProduct.slogan}
                onChange={(e) => setEditProduct({ ...editProduct, slogan: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={editProduct.quantity}
                onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })}
              />
              <button id='update' onClick={handleEditProduct}>Update Product</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
