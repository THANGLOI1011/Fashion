// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBLfX4WesPLYBzx4YHYmSUGWwdKdnlS79Q",
  authDomain: "ecommerce-contact-d0e59.firebaseapp.com",
  databaseURL: "https://ecommerce-contact-d0e59-default-rtdb.firebaseio.com",
  projectId: "ecommerce-contact-d0e59",
  storageBucket: "ecommerce-contact-d0e59.appspot.com",
  messagingSenderId: "468266929897",
  appId: "1:468266929897:web:46481a2939671e8a37aa78"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
