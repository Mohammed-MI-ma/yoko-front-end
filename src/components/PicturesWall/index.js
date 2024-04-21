import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const PicturesWall = ({ handleVariantChange, index }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  useEffect(() => {
    handleVariantChangeHandler();
  }, [fileList]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handleVariantChangeHandler = () => {
    handleVariantChange(index, "images", fileList);
  };
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const beforeUpload = (file) => {
    const isJpgOrPngOrWebp =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp";
    if (!isJpgOrPngOrWebp) {
      message.error("You can only upload JPG/PNG/Webp file!");
    }
    const isLt300Kb = file.size / 1024 < 300;
    if (!isLt300Kb) {
      message.error("Image must be smaller than 300KB!");
    }
    return isJpgOrPngOrWebp && isLt300Kb;
  };
  return (
    <>
      <Upload
        action={`${process.env.REACT_APP_BASE_API_URI_DEV}api/application/product/upload`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={onRemove}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterClose: () => setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default PicturesWall;
