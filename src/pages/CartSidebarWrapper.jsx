import React, { useEffect } from "react";
import CartSidebar from "../components/CartSidebar";
import { useAppContext } from "../contexts/AppContext";

const CartSidebarWrapper = () => {
  const { isCartOpen, toggleCart } = useAppContext();

  useEffect(() => {
    if (!isCartOpen) {
      toggleCart();
    }
  }, [isCartOpen, toggleCart]);

  return <CartSidebar />;
};

export default CartSidebarWrapper;