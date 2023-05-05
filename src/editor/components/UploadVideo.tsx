import React, { useState } from 'react';
import type { UploadProps, UploadChangeParam } from 'antd/lib/upload/interface';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import { Upload, Modal, Progress } from 'antd';

export default (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const handleChange = (params: UploadChangeParam) => {
    const { file, event } = params;
    if (file.status === 'uploading') {
      setIsModalOpen(true);
      setPercent(event?.percent);
    }
    if (file.status === 'done') {
      setIsModalOpen(false);
      setPercent(0);
    };
    props?.onChange(params);
  };

  const uploadVideoProps: UploadProps = {
    accept: '.mp4',
    showUploadList: false,
    name: 'file',
    ...props,
    onChange: handleChange,
  };

  return (
    <span className="ql-formats">
      <Upload {...uploadVideoProps}>
        <VideoCameraAddOutlined />
      </Upload>
      <Modal open={isModalOpen} footer={null} width={300} centered closable={false}>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Progress type="circle" percent={percent} />
        </div>
      </Modal>
    </span>
  );
};
