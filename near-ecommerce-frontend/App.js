import React, { useState, useEffect } from 'react';
import { async } from 'regenerator-runtime';
import './assets/global.css';
import { createOrder, getProducts } from './services/api';
import { signIn, logout, wallet, getOrderDetail, payOrder, payOrderSimple } from "./services/blockchain";

export default function App() {
  const [message, setMessage] = useState("Hello World");
  const [products, setProducts] = useState([]);

  function onChangeMessage(params) {
    setMessage("Hello World UIT");
  }

  async function fetchProductData() {
    let products = await getProducts();
    console.log("Products: ", products);
    setProducts(products);
  }

  //6319f73a420bd8f28b365a02

  async function getOrderDataOnchain(orderId) {
    let data = await getOrderDetail(orderId);
    console.log("Data on-chain: ", data);
  }

  async function handleBuyNow(productId) {
    if (!wallet.isSignedIn()) {
      signIn();
    }

    // create order
    let order = {
      "product": productId,
      "quantity": 2,
      "accountId": wallet.getAccountId(),
      "customer": {
          "name": "Vu Nguyen",
          "phone": "09123123",
          "email": "vunguyen@gmail.com",
          "address": "So 10 Tran Phu, Ha Noi"
      }
    };

    let data = await createOrder(order);
    console.log("Create order data: ", data);

    // Redirect to NEAR wallet
    if (data && data.redirectUrl) {
      window.location.replace(data.redirectUrl);
    }

    // 
    // let response = await payOrderSimple("6319f73a420bd8f28b365a02", "4");

  }

  useEffect(() => {
    fetchProductData();
    getOrderDataOnchain("6319f73a420bd8f28b365a02");
  }, [])

  return (
    <div>
      <h1>{message} {wallet.getAccountId()}</h1>
      {
        wallet.isSignedIn() ?
        <button onClick={logout}>Logout: {wallet.getAccountId()}</button>:
        <button onClick={signIn}>Login with NEAR</button>
      }

      <div className='product-lists'>
        {
          products.map(product => {

            return (

              <div className='product-item'>
                  <img src={product.image}></img>
                  <p><strong>Name:</strong> {product.name}</p>
                  <p>Price: {product.price} N</p>
                  <p>Desc: {product.description}</p>
                  <button onClick={() => handleBuyNow(product._id)}>Buy now</button>
              </div>
            )

          })
        }
      </div>
    </div>
  )
}
