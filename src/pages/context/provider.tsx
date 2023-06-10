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
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
  addItemToCart: ({}) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
