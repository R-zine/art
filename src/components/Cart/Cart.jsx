import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "./cart.css";

const Cart = ({ cartObject, removeCart, empty }) => {
  const FilledCart = ({ cart }) => {
    return (
      <div className="cart--page">
        <h4>Your cart:</h4>
        <div className="cart--items">
          {cart.line_items.map((i) => {
            return <CartItem item={i} handleRemove={removeCart} />;
          })}
          <h3 className="subtotal">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </h3>
        </div>
        <div className="btn-container">
          <button className="empty-btn" onClick={empty}>
            Empty Cart
          </button>
          <Link to="/checkout">
            <button className="checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
    );
  };

  const EmptyCart = () => {
    return (
      <>
        <div className="no--cart--page">
          <h4 className="cart--page--noitems">
            There are no items in your cart.
          </h4>
          <Link to="/">
            <button className="back-btn">Back to Shop</button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div>
      {cartObject.total_items ? (
        <FilledCart cart={cartObject} />
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
