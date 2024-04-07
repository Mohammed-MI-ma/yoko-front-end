import { Avatar } from "antd";

export const transportationOptions = [
  { value: "car", index: 1 },
  { value: "Vélo", index: 2 },
  { value: "Moto", index: 3 },
  { value: "Pickup", index: 4 },
];
export const TemplateTransaportation = ({ text, icon }) => {
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
      <div>{text}</div>
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
