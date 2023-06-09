import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import Image from "next/image";
import logoImg from "../assets/logo-igniteshop.svg";
import { Container, Header } from "../styles/pages/app";
import Link from "next/link";
import CartProvider from "./context/provider";
import Cart from "./component/cart/cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Cart />
        <Link href={"/"}>
          <Image src={logoImg} alt="" />
        </Link>
      </Header>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  );
}
