import { Avatar } from "antd";

export const productOptions = [
  { value: "Clothing", index: 1, disabled: true },
  { value: "Kitchen", index: 2, disabled: false },
  { value: "Books", index: 3, disabled: true },
  { value: "Beauty", index: 4, disabled: true },
];
export const productOptionsExtension = [
  { value: "Electronics", index: 5, disabled: true },
  { value: "Decor", index: 6, disabled: true },
  { value: "Toys", index: 7, disabled: true },
  { value: "Sports", index: 8, disabled: true },
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
