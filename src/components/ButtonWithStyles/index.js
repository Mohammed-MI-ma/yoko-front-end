import { Button } from "antd";

const ButtonWithStyles = ({ onClickHandler, icon, children, ...rest }) => {
  const { fontFamily, fontWeight } = rest.style || {};
  return (
    <Button
      size="large"
      onClick={onClickHandler}
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
