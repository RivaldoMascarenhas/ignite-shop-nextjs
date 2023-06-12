import { useEffect, useRef, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import {
  CartItem,
  CartList,
  CartSidebar,
  CartTitle,
  ImageContainerCart,
  RemoveButton,
  InfoCart,
  CartButton,
  Notification,
  Close,
} from "./style";
import { CartContext } from "../../context/provider";
import Image from "next/image";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/Ai";

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
      <div>
        <CartButton onClick={toggleCart}>
          <HiOutlineShoppingBag size={24} color="white" />
          {cartItems.length > 0 && (
            <Notification>{cartItems.length}</Notification>
          )}
        </CartButton>
      </div>
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
            <CartTitle>Sacola Compras</CartTitle>
            <Close onClick={toggleCart}>
              <AiOutlineClose fontSize={24} />
            </Close>

            {cartItems?.length === 0 ? (
              <>
                <p>Nada por aqui...</p>
              </>
            ) : (
              <CartList>
                {cartItems?.map((item: Item) => (
                  <CartItem key={item.id}>
                    <ImageContainerCart>
                      <Image
                        src={item?.imageURL}
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </ImageContainerCart>
                    <InfoCart>
                      <p>{item.name}</p>
                      <span>Preço: {item.price}</span>
                      <RemoveButton
                        onClick={() => removeItemFromCart(item)}
                        aria-label="Remover item"
                      >
                        Remover
                      </RemoveButton>
                    </InfoCart>
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
