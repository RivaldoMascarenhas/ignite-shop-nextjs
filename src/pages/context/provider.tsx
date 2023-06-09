import React, { createContext, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
interface Item {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
}
interface ProductProps {
  cartItems: Item[];
  setCartItems: (i: Item[]) => void;
  addItemToCart: ({}) => void;
  isCartOpen: boolean;
  setIsCartOpen: (V: boolean) => void;
}

export const CartContext = createContext({} as ProductProps);

export default function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addItemToCart = (item: Item) => {
    setCartItems([...cartItems, item]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
