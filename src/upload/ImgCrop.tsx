import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import {
  getOSSData,
  getUploadExtraData,
  getUploadFileName,
  OSSDataType,
} from './utils';

export default ({
  maxLength = 1,
  value,
  onChange,
  children = '+ Upload',
  uploadProps,
  showImgCrop = true,
  imgCropProps,
}: any) => {
  const [fileList, handleFileList] = useState<any[]>([]);
  const [previewVisible, handlePreviewVisible] = useState(false);
  const [previewImage, handlePreviewImage] = useState<string>('');
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
        const fileListData = value.map((item: string) => ({
          url: item,
          status: 'done',
        }));
        handleFileList(fileListData);
      } else if (typeof value === 'string') {
        handleFileList([
          {
            url: value,
            status: 'done',
          },
        ]);
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

  const handlePreview = async (file: any) => {
    handlePreviewImage(file.url || file.preview);
    handlePreviewVisible(true);
  };

  const handleOnChange: UploadProps['onChange'] = (data?: any) => {
    const { fileList } = data;
    if (maxLength === 1 && fileList.length) {
      const currentFileList = fileList[0];

      // 只有图片上传完毕后在push到form中
      if (currentFileList.status === 'done') {
        onChange?.(currentFileList.url);
      }
      handleFileList([currentFileList]);
    } else if (fileList.length) {
      let allDone = true;

      const currentFileList = fileList.map((item: any) => {
        if (item?.status !== 'done') {
          allDone = false;
        }
        return item;
      });
      if (allDone) {
        const urlList = currentFileList.map((item: any) => item.url);
        onChange?.(urlList);
      }
      handleFileList(currentFileList);
    } else {
      onChange(null);
      handleFileList([]);
    }
  };

  const handleOnRemove = (file: any) => {
    const files = fileList.filter((v) => v.url !== file.url);
    if (onChange) {
      handleFileList(files);
    }
  };

  const handleCancel = () => handlePreviewVisible(false);

  const initUploadProps: any = {
    listType: 'picture-card',
    action: OSSData?.host,
    data: getExtraData,
    maxCount: maxLength,
    accept: 'image/*',
    fileList: fileList,
    onChange: handleOnChange,
    onPreview: handlePreview,
    onRemove: handleOnRemove,
    beforeUpload,
    ...uploadProps,
  };

  return (
    <>
      {showImgCrop ? (
        <ImgCrop rotationSlider quality={1} {...imgCropProps}>
          <Upload {...initUploadProps}>
            {fileList.length < maxLength && children}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload {...initUploadProps}>{children}</Upload>
      )}

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
