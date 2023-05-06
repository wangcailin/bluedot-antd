import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getOSSData,
  getUploadExtraData,
  getUploadFileName,
  OSSDataType,
} from './utils';

export default ({
  maxLength = 1,
  accept,
  value,
  onChange,
  children = (
    <>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </>
  ),
  uploadProps,
}: any) => {
  const [fileList, handleFileList] = useState<any[]>([]);
  const [OSSData, setOSSData] = useState<OSSDataType>();

  const init = async () => {
    try {
      const result = await getOSSData();
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
    if (value) {
      if (value instanceof Array) {
        handleFileList(value);
      } else if (typeof value === 'object') {
        handleFileList([value]);
      }
    }
  }, []);

  const getExtraData: UploadProps['data'] = (file) => {
    if (!OSSData) return {};
    return getUploadExtraData(OSSData, file);
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;
    // @ts-ignore
    file.url = `${OSSData.host}/${OSSData.dir}/${getUploadFileName(file)}`;
    return file;
  };

  const handleOnChange: UploadProps['onChange'] = ({ file, fileList }) => {
    if (maxLength === 1 && file) {
      if (file.status === 'done') {
        onChange?.(file);
      }
      handleFileList(fileList);
    } else if (fileList.length) {
      let allDone = true;

      const currentFileList = fileList.map((item: any) => {
        if (item?.status !== 'done') {
          allDone = false;
        }
        return item;
      });
      if (allDone) {
        onChange?.(currentFileList);
      }
      handleFileList(currentFileList);
    } else {
      onChange(null);
      handleFileList([]);
    }
  };

  const handleOnRemove = (file: any) => {
    if (maxLength === 1) {
      onChange?.(null);
      handleFileList([]);
    } else {
      const files = fileList.filter((v) => v.url !== file.url);
      onChange?.(files);
      handleFileList([files]);
    }
  };

  const initUploadProps: any = {
    action: OSSData?.host,
    data: getExtraData,
    maxCount: maxLength,
    fileList,
    onChange: handleOnChange,
    onRemove: handleOnRemove,
    beforeUpload,
    accept,
    ...uploadProps,
  };

  return (
    <>
      <Upload {...initUploadProps}>
        {fileList.length < maxLength && children}
      </Upload>
    </>
  );
};
