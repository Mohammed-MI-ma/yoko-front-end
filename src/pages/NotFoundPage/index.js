// NotFoundPage.js

import React from "react";
import { Result } from "antd";
const NotFoundPage = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
};

export default NotFoundPage;
