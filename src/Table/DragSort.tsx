import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useEffect, useRef } from 'react';
import React from 'react';

interface DraggerComponentProps {
  search?: boolean;
  pagination?: boolean;
  rowKey?: string;
  reloadDataTime?: any;
  headerTitle?: string;
  columns?: any[];
  queryRule?: () => Promise<any>;
  addRule?: (values: any) => Promise<any>;
  updateRule?: (data: any) => Promise<any>;
  dragHandleRender?: () => React.ReactNode;
  ModalForm?: any;
}


const DraggerTable: React.FC<DraggerComponentProps> = ({
  reloadDataTime,//监听刷新子组件
  headerTitle, //标题
  columns, //列
  queryRule, //查询 排序url
  addRule, //更新 排序url
  updateRule, //更新 排序url
  dragHandleRender,//拖动图标
  ModalForm,//新增的组件
  search=true, //是否支持搜索
  pagination=true,//是否分页
  rowKey="id",//rowKey
}) => {

  const actionRef = useRef<ActionType>();

  useEffect(() => {
    actionRef?.current?.reload(); 
  }, [reloadDataTime]);
  
  const handleDragSortEnd = (newDataSource: any) => {
    console.log('排序后的数据', newDataSource);
    // 请求成功之后刷新列表
    updateRule(newDataSource).then((result) => {
      console.log(result)
      return result
    });
    actionRef.current?.reload();
    message.success('修改列表排序成功');
  };

  return (
    <>
      <DragSortTable
        actionRef={actionRef}
        headerTitle={headerTitle}
        columns={columns}
        dragSortHandlerRender={dragHandleRender}
        rowKey={rowKey}
        search={search}
        pagination={pagination}
        request={queryRule}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
        toolBarRender={() => [
          <ModalForm
            title="新建"
            onFinish={async (values: any) => {
              await addRule(values);
              message.success('提交成功');
              actionRef?.current?.reload();
              return true;
            }}
            key="create"
          >
            <Button key="button" icon={<PlusOutlined />} type="primary">
              新建
            </Button>
          </ModalForm>,
        ]}
      />
    </>
  );
};

export default DraggerTable;