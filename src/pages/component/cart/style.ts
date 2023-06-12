import { styled } from "@stitches/react";
import { motion } from "framer-motion";

export const CartSidebar = styled(motion.div, {
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

export const CartTitle = styled("h2", {
  marginTop: 0,
});

export const CartList = styled("ul", {
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const CartItem = styled("li", {
  marginBottom: "10px",
  color: "Black",
});

export const RemoveButton = styled("button", {
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
