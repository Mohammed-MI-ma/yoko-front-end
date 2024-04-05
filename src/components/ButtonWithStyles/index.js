import { Button } from "antd";

const ButtonWithStyles = ({ icon, children, ...rest }) => {
  const { fontFamily, fontWeight } = rest.style || {};
  return (
    <Button
      size="large"
      className="w-full flex justify-center items-center gap-2"
      style={{
        fontFamily: fontFamily,
        fontWeight: fontWeight,
      }}
    >
      {icon}
      {children}
    </Button>
  );
};
export default ButtonWithStyles;
