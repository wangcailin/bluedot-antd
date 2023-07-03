import { TreeSelect, message } from 'antd';
import React, { useEffect, useState } from 'react';

type QueryTreeFunc = () => Promise<any[]>;

interface TreeSelectProps {
  queryTree: QueryTreeFunc;
  num?: number;
}
const CustomTreeSelect: React.FC<TreeSelectProps> = ({
  queryTree,
  num = 1,
}) => {
  //标签数据
  const [treeData, setTreeData] = useState<any[]>([]);
  const [value, setValue] = useState<any[]>([]);

  const handleTreeSelectChange = (selectedValue: any[]) => {
    if (selectedValue.length > num) {
      message.warning('最多只能选择' + num + '个!');
      selectedValue.pop();
      setValue([...selectedValue]);
      return;
    }
    setValue(selectedValue);
  };

  useEffect(() => {
    queryTree().then((result: any) => {
      setTreeData(result);
    });
  }, [queryTree]);

  return (
    <>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
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
    </>
  );
};

export default CustomTreeSelect;
