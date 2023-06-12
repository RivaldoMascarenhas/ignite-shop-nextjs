import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import Head from "next/head";
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Link from "next/link";
import { CartButton } from "../component/cart/style";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext } from "react";
import { CartContext } from "./context/provider";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
  }[];
}
export default function Home({ products }: HomeProps) {
  const [slideRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  const { addItemToCart, notify } = useContext(CartContext);
  return (
    <>
      <Head>
        <title>Ignite Shop</title>
      </Head>
      <HomeContainer ref={slideRef} className="keen-slider">
        {products.map((product) => {
          return (
            <div key={product?.id}>
              <Product className="keen-slider__slide">
                <Link href={`/product/${product?.id}`} prefetch={false}>
                  <Image
                    src={product?.imageURL}
                    width={520}
                    height={480}
                    alt=""
                  />
                </Link>
                <footer>
                  <Link href={`/product/${product?.id}`} prefetch={false}>
                    <strong>{product?.name}</strong>
                    <span>{product?.price}</span>
                  </Link>
                  <CartButton
                    Background={"Green"}
                    Cursor={"pointer"}
                    onClick={() => {
                      addItemToCart(product);
                    }}
                  >
                    <HiOutlineShoppingBag size={24} color="white" />
                  </CartButton>
                </footer>
              </Product>
            </div>
          );
        })}
      </HomeContainer>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageURL: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
