import React, { useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ImageUploader = ({ onImageUpload }) => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("File list in handleChange:", newFileList);
    if (newFileList.length === 0) {
      onImageUpload(null);
    } else {
      onImageUpload(newFileList[newFileList.length - 1].originFileObj);
    }
  };

  const customRequest = ({ onSuccess, file }) => {
    setFileList([...fileList, file]);
    onSuccess();
  };

  const handleRemove = (file) => {
    const filteredList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(filteredList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Image</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={handleChange}
      onRemove={handleRemove}
      customRequest={customRequest}
      showUploadList={{
        showPreviewIcon: false,
      }}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );
};

export default ImageUploader;
