// Cart.js
import React from 'react';
import { Button } from '@material-ui/core';

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <Button onClick={() => removeFromCart(item)}>Remove</Button>
        </div>
      ))}
    </div>
  );
};


export default Cart;


