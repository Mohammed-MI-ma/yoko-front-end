import { Avatar } from "antd";

export const productOptions = [
  { value: "Clothing", index: 1 },
  { value: "Kitchen", index: 2 },
  { value: "Books", index: 3 },
  { value: "Beauty", index: 4 },
];
export const productOptionsExtension = [
  { value: "Electronics", index: 5 },
  { value: "Decor", index: 6 },
  { value: "Toys", index: 7 },
  { value: "Sports", index: 8 },
];

export const TemplateProduct = ({ text, icon }) => {
  return (
    <div
      style={{
        padding: 4,
      }}
    >
      <Avatar
        style={{
          backgroundColor: "var(--color-secondary)",
          verticalAlign: "middle",
        }}
        size="large"
      >
        {icon}
      </Avatar>
      <div
        style={{
          fontSize: "var(--font-small-size)",
          fontFamily: "var(--font-primary)",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export const Label = ({ children }) => {
  return (
    <p
      style={{
        textAlign: "left",
        width: "100%",
        fontSize: "var(--font-extra-small-size)",
      }}
    >
      {children}
    </p>
  );
};
