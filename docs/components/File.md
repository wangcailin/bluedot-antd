## File

```tsx
import { Upload } from '@bluedot-tech/bluedot-antd';

export default () => {
  return (
    <>
      <Upload.File
        uploadProps={{
          action: 'https://xxx.com/upload',
        }}
      >
        上传
      </Upload.File>
    </>
  );
};
```

## API

| 参数        | 说明              | 类型   | 默认值 | 版本 |
| ----------- | ----------------- | ------ | ------ | ---- |
| maxLength   | 最多上传几个视频  | number | 1      |
| uploadProps | antd 组件的 props | object | -      |
| accept      | -                 | -      | -      |
