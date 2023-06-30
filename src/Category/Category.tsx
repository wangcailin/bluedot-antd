import { ProForm } from '@ant-design/pro-components';
import { TreeSelect, message } from 'antd';
import React, { useEffect, useState } from 'react';

type QueryTreeFunc = () => Promise<any>;
export default ({
  queryTree,
  num = 1,
  name = 'category_id',
  label = '分类',
}: {
  queryTree: QueryTreeFunc;
  num?: number;
  name?: string;
  label?: string;
}) => {
  //标签数据
  const [treeData, setTreeData] = useState<any>();
  const handleTreeSelectChange = (value: any) => {
    if (value.length > num) {
      message.warning('最多只能选择' + num + '个!');
      value.pop();
      return;
    }
  };
  useEffect(() => {
    queryTree().then((result: any) => {
      setTreeData(result);
    });
  }, []);

  return (
    <>
      <ProForm.Item name={name} label={label} rules={[{ required: true }]}>
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          treeData={treeData}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择"
          allowClear
          treeDefaultExpandAll
          treeNodeFilterProp="name"
          multiple={true}
          fieldNames={{ label: 'name', value: 'id', children: 'children' }}
          onChange={handleTreeSelectChange}
        />
      </ProForm.Item>
    </>
  );
};
