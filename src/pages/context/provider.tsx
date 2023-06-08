import React, { createContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

interface ProductProps {
  product1: object;
  setProduct: React.Dispatch<React.SetStateAction<object>>;
}

export const CartContext = createContext({} as ProductProps);

export default function CartProvider({ children }: CartProviderProps) {
  const [product1, setProduct] = useState<object>(null);

  return (
    <CartContext.Provider value={{ product1, setProduct }}>
      {children}
    </CartContext.Provider>
  );
}
