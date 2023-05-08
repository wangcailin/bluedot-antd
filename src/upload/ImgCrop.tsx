import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import type { UploadFile, UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import {
  getOSSData,
  getUploadExtraData,
  getUploadFileName,
  OSSDataType,
} from './utils';

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile<any>;
}

const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.url,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'move',
  };

  // prevent preview event when drag end
  const className = isDragging
    ? css`
        a {
          pointer-events: none;
        }
      `
    : '';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === 'error' && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

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

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = fileList.findIndex((i) => i.url === active.id);
      const overIndex = fileList.findIndex((i) => i.url === over?.id);
      const newFileList = arrayMove(fileList, activeIndex, overIndex);
      handleFileList(newFileList);
      const urlList = newFileList.map((item: any) => item.url);
      onChange?.(urlList);
    }
  };

  console.log(fileList);

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
    itemRender: (originNode, file) => (
      <DraggableUploadListItem originNode={originNode} file={file} />
    ),
    ...uploadProps,
  };

  return (
    <>
      {showImgCrop ? (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={fileList.map((i) => i.url)}
            strategy={rectSortingStrategy}
          >
            <ImgCrop rotationSlider quality={1} {...imgCropProps}>
              <Upload {...initUploadProps}>
                {fileList.length < maxLength && children}
              </Upload>
            </ImgCrop>
          </SortableContext>
        </DndContext>
      ) : (
        <Upload {...initUploadProps}>{children}</Upload>
      )}

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
