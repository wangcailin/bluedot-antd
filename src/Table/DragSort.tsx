import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';
import React from 'react';

export default ({
  search=true, //是否支持搜索
  pagination=true,//是否分页
  rowKey="id",//rowKey
  headerTitle, //标题
  columns, //列
  queryRule, //查询 排序url
  updateRule, //更新 排序url
  dragHandleRender,//拖动图标
}) => {
  const request = async () => {
    return queryRule().then((result) => {
      console.log(result)
      return result
    });
  };
  console.log(pagination)
  
  const actionRef = useRef<ActionType>();
  
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
        request={request}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
      />
    </>
  );
};