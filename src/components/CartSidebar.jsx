import React from "react";
import { useAppContext } from "../contexts/AppContext";
import CartItem from "./CartItem";
import RelatedItemCard from "./RelatedItemCard";
import "./CartSidebar.css";

const CartSidebar = () => {
    const { isCartOpen, toggleCart, cartItems, relatedItems } = useAppContext();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const vat = subtotal * 0.2;
    const total = subtotal + vat;

    return (
        <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
            <div className="related-section">
                <h3>Related Items</h3>
                <div className="related-items">
                    {relatedItems.map((item) => (
                        <RelatedItemCard key={item.id} {...item} />
                    ))}
                </div>
            </div>

            <div className="cart-main">
                <div className="cart-header">
                    <h2>My cart</h2>
                    <button onClick={toggleCart} className="close-btn">×</button>
                </div>

                <div className="cart-items">
                    {/* {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))} */}
          {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            quantity={item.quantity}
                            weight={item.weight}
                        />
                    ))}

                </div>

                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Sub-Total :</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>VAT (20%) :</span>
                        <span>${vat.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total :</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-buttons">
                        <button className="view-cart-btn">View Cart</button>
                        <button className="checkout-btn">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
