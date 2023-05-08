import { UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
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
    id: file.uid,
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

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = fileList.findIndex((i) => i.uid === active.id);
      const overIndex = fileList.findIndex((i) => i.uid === over?.id);
      const newFileList = arrayMove(fileList, activeIndex, overIndex);
      handleFileList(newFileList);
      onChange?.(newFileList);
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
    itemRender: (originNode, file) => (
      <DraggableUploadListItem originNode={originNode} file={file} />
    ),
    ...uploadProps,
  };

  return (
    <>
      {maxLength === 1 ? (
        <Upload {...initUploadProps}>
          {fileList.length < maxLength && children}
        </Upload>
      ) : (
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={fileList.map((i) => i.uid)}
            strategy={verticalListSortingStrategy}
          >
            <Upload {...initUploadProps}>
              {fileList.length < maxLength && children}
            </Upload>
          </SortableContext>
        </DndContext>
      )}
    </>
  );
};
