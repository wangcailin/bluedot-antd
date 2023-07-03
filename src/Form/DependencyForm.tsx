import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Editor, Upload } from '@bluedot-tech/bluedot-antd';
import React from 'react';

export default ({
  filedoc = 'application/pdf', //文件类型
  filepic = 'image/jpeg', //图片类型
  type = [], //定义input类型
  filetype = [], //定义上传上传类型
  filenum = [], //定义上传数量
  imgwidth = 410, //定义裁剪图片宽度
  imgheight = 410, //定义裁剪图片高度
}) => {
  //   console.log(11111111, props);
  return (
    <>
      <ProFormList
        name="form"
        initialValue={[{}]}
        alwaysShowItemLabel
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.name}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProFormSelect options={type} name="typeUseMode" label="类型" />
        <ProFormDependency name={['typeUseMode']}>
          {({ typeUseMode }) => {
            if (typeUseMode === 1) {
              return (
                <>
                  <ProFormSelect
                    options={filetype}
                    name="fileType"
                    key="filetype"
                    label="文件类型"
                  />
                  <ProFormDependency name={['fileType']}>
                    {({ fileType }) => {
                      if (fileType) {
                        return (
                          <ProFormSelect
                            options={filenum}
                            name="fileNum"
                            key="filenum"
                            label="数量"
                          />
                        );
                      }
                    }}
                  </ProFormDependency>
                  <ProFormDependency name={['fileType', 'fileNum']}>
                    {({ fileType, fileNum }) => {
                      console.log(imgwidth);
                      console.log(imgheight);
                      let filenumber = 1;
                      if (fileNum === 2) {
                        filenumber = 10000;
                      }
                      if (fileType === 2) {
                        return (
                          <ProForm.Item
                            name="fileurl"
                            help={'图片比例: ' + imgwidth + '*' + imgheight}
                          >
                            <Upload.ImgCrop
                              //   aspect={410 / 410}
                              aspect={imgwidth / imgheight}
                              style={{ width: '100%', marginBottom: '30px' }}
                              maxCount={filenumber}
                              accept={filepic}
                            />
                          </ProForm.Item>
                        );
                      } else if (fileType === 1) {
                        return (
                          <ProForm.Item name="fileurl">
                            <Upload.File
                              accept={filedoc}
                              maxCount={filenumber}
                            />
                          </ProForm.Item>
                        );
                      }
                    }}
                  </ProFormDependency>
                </>
              );
            }
            if (typeUseMode === 2) {
              return (
                <ProForm.Item name="content">
                  <Editor.Quill />
                </ProForm.Item>
              );
            }
          }}
        </ProFormDependency>
      </ProFormList>
    </>
  );
};
