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
  id: string;
  name: string;
  imageURL: string;
  price: string;
  description: string;
  defaultPriceID: string;
}

function Cart() {
  const { cartItems, removeItemFromCart, isCartOpen, toggleCart } =
    useContext(CartContext);

  const cartRef = useRef<HTMLDivElement>(null);

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
            {cartItems?.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <CartList>
                {cartItems?.map((item) => (
                  <CartItem key={item.id}>
                    <Image
                      src={item?.imageURL}
                      alt={item.name}
                      width={500}
                      height={400}
                    />
                    {item.name} - Preço: {item.price}
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
