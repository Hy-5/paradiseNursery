import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cartItems) => {
    if (!Array.isArray(cartItems)) {
      return 0;
    }
    return cartItems.reduce((total, item) => {
      // Extract numeric value from item.cost
      let cost = item.cost;
      if (typeof cost === 'string') {
        cost = cost.replace('$', '');
        cost = parseInt(cost, 10);
      }
      // Ensure quantity is a number
      let quantity = parseInt(item.quantity, 10) || 1;
      return total + (cost * quantity);
    }, 0);
  };
  


  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
        onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('WORK IN PROGRESS');
    };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({name:item.name, quantity:item.quantity+1}));
  };

  const handleDecrement = (item) => {
   if (item.quantity>1){
    dispatch(updateQuantity({name:item.name, quantity:item.quantity-1}));
   }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    if (!item || typeof item.cost !== 'number' || typeof item.quantity !== 'number') {
        const numb=item.cost.replace('$', '');
        const price = parseInt(numb, 10);
        return price * item.quantity;
    }
    return item.cost * item.quantity;
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


