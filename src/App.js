import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Paintings } from "./components/paintings/Paintings";
import SinglePainting from "./components/paintings/SinglePainting";
import Navbar from "./components/NavBar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Error from "./Error";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => setCart(await commerce.cart.retrieve());

  const handleAddCart = async (productID, quantity = 1) => {
    const item = await commerce.cart.add(productID, quantity);
    setCart(item.cart);
  };

  const handleRemoveCart = async (productID) => {
    const { cart } = await commerce.cart.remove(productID);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Navbar cartData={cart} />
      <Routes>
        <Route
          path="/"
          element={<Paintings products={products} onAddCart={handleAddCart} />}
        ></Route>
        <Route
          path=":paintingId"
          element={
            <SinglePainting products={products} onAddCart={handleAddCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartObject={cart}
              removeCart={handleRemoveCart}
              empty={handleEmptyCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
