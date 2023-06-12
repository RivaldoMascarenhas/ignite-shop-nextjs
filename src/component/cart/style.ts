import { styled } from "@stitches/react";
import { motion } from "framer-motion";

export const CartSidebar = styled(motion.div, {
  position: "fixed",
  top: 0,
  right: 0,
  width: "480px",
  height: "100vh",
  backgroundColor: "#202024",
  padding: "4.5rem 3rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  zIndex: 999,
});

export const CartTitle = styled("h2", {
  marginTop: 0,
  marginBottom: "1rem",
});

export const CartList = styled("ul", {
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  marginTop: "2rem",
});

export const CartItem = styled("li", {
  marginBottom: "10px",
  color: "white",

  display: "flex",
  gap: "2rem",
});

export const RemoveButton = styled("button", {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: "#c82333",
  },
});
export const ImageContainerCart = styled("div", {
  width: "100%",
  maxWidth: 100,
  height: 100,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  padding: "0.25rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

export const InfoCart = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const CartButton = styled("button", {
  position: "relative",
  border: "none",
  background: "#202024",
  padding: "0.5rem",
  borderRadius: 4,
  variants: {
    Background: {
      Green: {
        background: "#00875F",
      },
      Gray: {
        background: "#202024",
      },
    },
    Cursor: {
      pointer: {
        cursor: "pointer",
      },
    },
  },
});
export const Notification = styled("div", {
  position: "absolute",
  top: -8,
  right: -8,
  background: "#00875F",
  padding: "0.2rem",
  borderRadius: 999,
  width: "62%",
  color: "White",
  border: "solid 2px $gray900",
});

export const Close = styled("div", {
  position: "absolute",
  top: 24,
  right: 24,
});
