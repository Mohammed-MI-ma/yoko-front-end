import { Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const CustomSuspense = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Spin
          spinning
          fullscreen
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      }
      // Gestion des erreurs
      onError={(error) => console.error("Error during suspense:", error)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
};

export default CustomSuspense;
