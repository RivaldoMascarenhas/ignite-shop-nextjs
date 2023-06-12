import { stringify } from "querystring";
import React, { createContext, useEffect, useState } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}
interface Item {
  id: string;
  name: string;
  imageURL: string;
  price: string;
  description: string;
  defaultPriceID: string;
}
interface ProductProps {
  cartItems: Item[];
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
  addItemToCart: ({}) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  removeItemFromCart: (item: Item) => void;
  toggleCart: () => void;
}

export const CartContext = createContext({} as ProductProps);

export default function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (item: Item) => {
    setCartItems((state) => [...state, item]);
  };
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const local = localStorage.getItem("cartItems");
    if (local === null) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      setCartItems(JSON.parse(local));
    }
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const removeItemFromCart = (item: Item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        isCartOpen,
        setIsCartOpen,
        removeItemFromCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
