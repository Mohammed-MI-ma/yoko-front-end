import { Avatar } from "antd";
/*
FRUITS: "Fruits",
  VEGETABLES_HERBS: "Vegetables & Herbs",
  BUTCHERY_POULTRY: "Butchery & Poultry",
  FISHERY: "Fishery",
  BREAD: "Bread",
  BAKERY: "Bakery",
  GROCERY: "Grocery Essentials",
  DAIRY_EGGS: "Dairy & Eggs",
  CHEESE_CHARCUTERIE: "Cheese & Charcuterie",
  SODAS_APPETIZERS: "Sodas & Non-Alcoholic Appetizers",
  WATERS_COLD_DRINKS: "Waters & Cold Drinks",
  HEALTHY_LIFESTYLE: "Healthy Lifestyle",
  SALTY_SNACKS: "Salty Snacks",
  SWEET_TREATS: "Sweet Treats",
  ICE_CREAM_ICE_CUBES: "Ice Cream & Ice Cubes",*/

export const productOptions = [
  { value: "Fruits", index: 1, disabled: false },
  { value: "Vegetables & Herbs", index: 2, disabled: false },
  { value: "Butchery & Poultry", index: 3, disabled: false },
  { value: "Fishery", index: 4, disabled: false },
];
export const productOptionsExtension = [
  { value: "Bread", index: 5, disabled: false },
  { value: "Bakery", index: 6, disabled: false },
  { value: "Grocery Essentials", index: 7, disabled: false },
  { value: "Dairy & Eggs", index: 8, disabled: false },
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
