/* eslint-disable */

import { ConfigProvider, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import React, { memo } from 'react';
import { customRequest } from '../utils/oss';

export default memo(({ quillRef }: any) => {
  const uploadImgProps: UploadProps = {
    accept: 'image/*',
    customRequest,
    showUploadList: false,
    onSuccess: (response: any) => {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', response.url);
      editor.setSelection(range.index + 1);
    },
  };

  return (
    <div id="toolbar">
      <select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-direction" value="rtl"></button>
        <select className="ql-align"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
      </span>
      <span className="ql-formats" style={{ fontSize: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 0,
            },
          }}
        >
          <Upload {...uploadImgProps}>
            <a style={{ height: 21, display: 'flex', alignItems: 'center' }}>
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  d="M884.18750029 107.93750029c-13.12499971-5.625-27.18749971-8.4375-41.25000058-8.4375H181.06250029c-15.00000029 0-29.06250029 2.8125-42.1875 7.49999971C93.87500029 124.81250029 62 167.00000029 62 217.62500029V807.3125c0 50.625 31.87500029 92.8125 77.81249971 109.6875 13.12499971 4.68749971 27.18749971 7.49999971 42.1875 7.49999971h660.9375c65.62500029 0 119.06250029-53.4375 119.06250029-119.06249942V217.62500029c0-50.625-31.87500029-92.8125-77.81249971-109.6875zM422 364.81249971c0 48.75000029-40.31250029 88.12500029-90 88.12500029s-90-39.375-90-88.12500029 40.31250029-88.12500029 90-88.12499942 90 39.375 90 88.12499942z m420.93749971 499.68750058H181.06250029c-28.125 0-52.49999971-19.6875-58.12500058-46.87500058-0.93750029-3.75000029-0.93750029-7.49999971-0.93749942-11.25v-45l177.1875-149.99999942 63.74999971 60.93749971c32.81249971 31.87500029 85.31250029 33.75 120.9375 4.68749971l299.06250029-247.5c57.18750029 61.875 96.56250029 103.12499971 120.9375 124.68750029v251.25000029c-1.87499971 32.81249971-28.125 59.0625-60.93750058 59.0625z"
                  fill="#444444"
                ></path>
              </svg>
            </a>
          </Upload>
        </ConfigProvider>
      </span>
    </div>
  );
});
