import React, { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  notify: () => void;
}

export const CartContext = createContext({} as ProductProps);

export default function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (item: Item) => {
    if (!cartItems.some((value) => value.id === item.id)) {
      setCartItems((state) => [...state, item]);
      notify();
    }
  };
  const notify = () =>
    toast("Adicionado à Sacola", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  //Criando o localStrorage
  useEffect(() => {
    const local = localStorage.getItem("cartItems");
    if (local === null) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      setCartItems(JSON.parse(local));
    }
  }, []);

  //Atualizando o LocalStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  //Cart Open/Close
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const removeItemFromCart = (item: Item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    if (updatedCartItems.length === 0) {
      localStorage.removeItem("cartItems");
      setTimeout(() => {
        setIsCartOpen(!isCartOpen);
      }, 900);
    }
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
        notify,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
}
