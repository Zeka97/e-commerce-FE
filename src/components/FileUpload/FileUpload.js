import React, { useState, useEffect } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { convertToBase64 } from "../../utils/fileUpload";

const FileUpload = ({
  initialImageUrl,
  onFileChange,
  maxSize = 2, // max size in MB
  required = true,
  name = "file",
}) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (initialImageUrl) {
          const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}/image/${initialImageUrl}`
          );
          console.log(response);
          if (response.status === 404) {
            setFileList([]);
            return;
          }
          const blob = await response.blob();
          const file = new File([blob], "article-image.jpg", {
            type: "image/jpeg",
          });
          console.log(file);
          setFileList([{ originFileObj: file, name: "article-image.jpg" }]);
          onFileChange([file]);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [initialImageUrl]);

  const uploadProps = {
    name,
    multiple: false,
    action: null,
    onChange: async (info) => {
      const { status } = info.file;
      if (status === "removed") {
        setFileList([]);
        onFileChange(null);
      } else {
        setFileList([info.file]);
        try {
          const base64 = await convertToBase64(info.file);
          onFileChange(base64);
        } catch (error) {
          console.error("Error converting file:", error);
          message.error("Error processing the image");
        }
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }
      const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
      if (!isLtMaxSize) {
        message.error(`Image must be smaller than ${maxSize}MB!`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};

export default FileUpload;
