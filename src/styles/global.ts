import { globalCss } from ".";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    "-webkit-font-smothing": "antialised",
    background: "$gray900",
    color: "$gray100",
  },
  "body, input, textarea,button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
