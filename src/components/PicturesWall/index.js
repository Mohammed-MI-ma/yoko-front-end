import React, { useEffect, useState, useTransition } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import { useTranslation } from "react-i18next";
import useFontFamily from "../../utils/useFontFamily";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const PicturesWall = ({ handleVariantChange, index }) => {
  const { t, i18n } = useTranslation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const fontFamilyLight = useFontFamily(i18n.language, "normal");
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
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
    console.log(fileList);
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
    console.log("qsdqsds", file.name);
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt300Kb = file.size / 1024 < 300;
    if (!isLt300Kb) {
      message.error("Image must be smaller than 300KB!");
    }
    return isJpgOrPng && isLt300Kb;
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
