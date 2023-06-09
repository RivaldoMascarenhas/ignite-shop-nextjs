import { useEffect, useRef, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CartItem,
  CartList,
  CartSidebar,
  CartTitle,
  RemoveButton,
} from "./style";
import { CartContext } from "../../context/provider";
import Image from "next/image";

interface Item {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
}

function Cart() {
  const { cartItems, setCartItems, isCartOpen, setIsCartOpen } =
    useContext(CartContext);

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems([...cartItems, JSON.parse(storedCartItems)]);
    }
  }, [cartItems, setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItemFromCart = (item: Item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (isCartOpen) {
      cartRef.current?.focus();
    }
  }, [isCartOpen]);

  return (
    <div>
      <button onClick={toggleCart}>
        {isCartOpen ? "Fechar Carrinho" : "Abrir Carrinho"}
      </button>
      <AnimatePresence>
        {isCartOpen && (
          <CartSidebar
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            ref={cartRef}
            tabIndex={-1}
          >
            <CartTitle>Carrinho de Compras</CartTitle>
            {cartItems.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <CartList>
                {cartItems.map((item) => (
                  <CartItem key={item.id}>
                    <Image src={item.imageUrl} alt={item.name} />
                    {item.name} - Quantidade: {item.quantity}
                    <RemoveButton
                      onClick={() => removeItemFromCart(item)}
                      aria-label="Remover item"
                    >
                      Remover
                    </RemoveButton>
                  </CartItem>
                ))}
              </CartList>
            )}
          </CartSidebar>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cart;
