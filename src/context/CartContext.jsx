import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => cart.some((prod) => prod.id === id);

  const addItem = (item, quantity) => {
    if (!item || quantity <= 0) return;

    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p,
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotalQuantity = () => {
    return cart.reduce((acc, p) => acc + p.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  };

  const getItemQuantity = (id) => {
    const found = cart.find((p) => p.id === id);
    return found ? found.quantity : 0;
  };

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
      isInCart,
      getTotalQuantity,
      getTotalPrice,
      getItemQuantity,
    }),
    [cart],
  );

  return (
    <>
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
