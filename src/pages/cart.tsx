import { useState, useEffect, useRef } from "react";
import { styled } from "@stitches/react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  id: number;
  name: string;
  quantity: number;
  imageUrl: string;
}

const CartSidebar = styled(motion.div, {
  position: "fixed",
  top: 0,
  right: 0,
  width: "300px",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  zIndex: 999,
});

const CartTitle = styled("h2", {
  marginTop: 0,
});

const CartList = styled("ul", {
  listStyle: "none",
  padding: 0,
});

const CartItem = styled("li", {
  marginBottom: "10px",
});

const RemoveButton = styled("button", {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#c82333",
    textDecoration: "underline",
  },
});

function Cart() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item: Item) => {
    setCartItems([...cartItems, item]);
  };

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
                    <img src={item.imageUrl} alt={item.name} />
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
