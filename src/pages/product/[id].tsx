import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ProductContainer,
  ProductDetails,
  ImageContainer,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import handler from "../api/checkout";
import axios from "axios";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageURL: string;
    price: string;
    description: string;
    defaultPriceID: string;
  };
}

export default function Product({ product }: ProductProps) {
  async function handleBuyProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceID: product.defaultPriceID,
      });
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      //Conectar com uma ferramenta de observabilidade(Datadog/ Sentry)
      alert("Falha em redirecionar ao checkout!");
    }
  }
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageURL} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button onClick={handleBuyProduct}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_Nudcm69NDdk2HJ" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageURL: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceID: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
