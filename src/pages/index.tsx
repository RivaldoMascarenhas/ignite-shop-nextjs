import { styled } from "../styles";

const Button = styled("button", {
  background: "$green300",
  borderRadius: 4,
  border: 0,
  padding: "0.5rem 1rem",
  display: "flex",
  gap: "2rem",
  span: {
    color: "White",
  },
  "&:hover": {
    filter: "brightness(0.8)",
  },
});
export default function Home() {
  return (
    <Button>
      <span>Rivaldo</span>
      enviar!!
    </Button>
  );
}
