import { Button, List } from "antd";
import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import style from "./FooterListContainer.module.css";

const FooterListContainer = ({ data, language, header }) => {
  return (
    <div className="p-4 flex justify-center">
      <List
        style={{ direction: "rtl" }}
        header={
          <h4
            className={style.stroke}
            style={{
              fontFamily: `Primary-Regular-${language}`,
              fontWeight: "bold",
              fontSize: "var(--font-medium-size)",
            }}
          >
            {header}
          </h4>
        }
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Button
              type="link"
              style={{
                fontFamily: `Primary-Regular-${language}`,
                fontSize: "var(--font-small-size)",
                color: "#6B7280",
              }}
              className="flex justify-center items-center flex-row"
            >
              <AiFillCaretLeft /> {item}
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FooterListContainer;
