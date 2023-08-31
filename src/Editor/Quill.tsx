import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Toolbar from './Toolbar';

export default ({ value, onChange, ...props }: any) => {
  const quillRef = useRef<HTMLInputElement>(null);

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };
  console.log(value);

  return (
    <>
      <Toolbar quillRef={quillRef} />
      <ReactQuill
        ref={quillRef}
        modules={modules}
        value={value}
        onChange={(value) => {
          onChange?.(value);
        }}
        style={{ height: 500, width: 390 }}
        {...props}
      />
    </>
  );
};
