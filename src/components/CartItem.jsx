import React from "react";
import { useAppContext } from "../contexts/AppContext";
import "./CartItem.css";

const CartItem = ({ id, name, price, quantity, image, weight }) => {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useAppContext();

    return (
        <div className="cart-item">
            <img src={image} alt={name} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{name}</h4>
                {/* <p>
          <strong>${price.toFixed(2)}</strong> x {weight}
        </p> */}
                <p>
                    <strong>${(price ?? 0).toFixed(2)}</strong> x {weight}
                </p>
                <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(id)}>+</button>
                </div>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(id)}>×</button>
        </div>
    );
};

export default CartItem;
