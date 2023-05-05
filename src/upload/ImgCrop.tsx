import React, { useEffect, useState } from 'react';
import { Upload, Modal, Spin, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './ImgCrop.less';
import { UploadImgCropProps } from './interface';

export default ({
  maxLength = 1,
  value,
  onChange,
  children,
  uploadProps,
  showImgCrop = true,
  imgCropProps,
  appSource = 'tmp',
}: UploadImgCropProps) => {
  const [loading, setLoading] = useState(false);
  const [fileList, handleFileList] = useState<any[]>([]);
  const [previewVisible, handlePreviewVisible] = useState(false);
  const [previewImage, handlePreviewImage] = useState<string>('');

  useEffect(() => {
    if (value) {
      if (value instanceof Array) {
        handleFileList(value);
      } else if (typeof value === 'string') {
        handleFileList([{
          url: value,
          name: 'rc-upload-1652250813804-2',
          status: 'done',
          uid: 'rc-upload-1652250813804-2',
        }]);
      }
    }
  }, []);

  const handlePreview = async (file: any) => {
    handlePreviewImage(file.url || file.preview);
    handlePreviewVisible(true);
  };

  const handleOnChange = (data?: any) => {
    const { fileList } = data;
    if (maxLength == 1 && fileList.length) {
      const currentFileList = fileList[0];
      currentFileList.url = currentFileList?.response?.url || currentFileList.url || null;
      if (currentFileList.status === 'uploading') {
        setLoading(true);
      };
      // 只有图片上传完毕后在push到form中
      if (currentFileList.status === 'done') {
        setLoading(false);
        onChange?.(currentFileList.response.url);
      };
      handleFileList([currentFileList]);
    } else if (fileList.length) {
      let allDone = true;
      const currentFileList = fileList.map((item: any) => {
        item.url = item?.response?.url || item.url || null
        if (item?.status !== 'done') {
          allDone = false;
        };
        return item;
      });
      if (allDone) {
        onChange(currentFileList);
      };
      handleFileList(currentFileList);
    } else {
      onChange(null);
      handleFileList([]);
    };
  };

  const handleOnRemove = (file: any) => {
    const files = fileList.filter(v => v.url !== file.url);
    if (onChange) {
      handleFileList(files);
    }
  };

  const handleCancel = () => handlePreviewVisible(false);

  const initUploadProps: any = {
    listType: 'picture-card',
    data: {
      app_source: appSource,
    },
    showUploadList: maxLength == 1 ? false : true,
    maxCount: maxLength,
    accept: 'image/*',
    ...uploadProps,
    fileList: fileList,
    onChange: handleOnChange,
    onPreview: handlePreview,
    onRemove: handleOnRemove,
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{children ? children : 'Upload'}</div>
    </div>
  );

  const handelChildren = () => {
    if (!initUploadProps.showUploadList) {
      const imageUrl = fileList[0]?.url || value;
      return <div className="bluedot-upload-content">
        {
          imageUrl ?
            <Spin spinning={loading}>
              <div onClick={(event) => event.stopPropagation()}>
                <img src={imageUrl} style={{ maxWidth: 86, maxHeight: 86, borderRadius: imgCropProps?.shape == 'round' ? '50%' : '0' }} />
                <div className="bluedot-active">
                  <div onClick={() => handlePreview({ url: imageUrl })}>
                    <EyeOutlined style={{ fontSize: 16, color: '#fff' }} />
                  </div>
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ fontSize: 16, color: '#fff' }} />}
                    onClick={() => handleOnChange({ fileList: [] })}
                  />
                </div>
              </div>
            </Spin>
            : uploadButton
        }
      </div>
    } else if (children && fileList.length < maxLength) {
      return children;
    } else if (fileList.length < maxLength) {
      return uploadButton;
    };
  };

  return (
    <>
      {
        showImgCrop ? (
          <ImgCrop rotate {...imgCropProps}>
            <Upload {...initUploadProps}>
              {handelChildren()}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload {...initUploadProps}>
            {handelChildren()}
          </Upload>
        )
      }

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
