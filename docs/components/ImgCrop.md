## ImgCrop

```tsx
import { Upload } from '@bluedot-tech/bluedot-antd';

export default () => {
  return (
    <>
      <Upload.ImgCrop
        uploadProps={{
          action: 'https://xxx.com/upload',
        }}
      >
        上传
      </Upload.ImgCrop>
    </>
  );
};
```

## API

| 参数         | 说明                       | 类型    | 默认值 | 版本 |
| ------------ | -------------------------- | ------- | ------ | ---- |
| maxLength    | 最多上传几个视频           | number  | 1      |
| showImgCrop  | 是否裁剪图片               | boolean | true   |
| uploadProps  | antd 组件的 props          | object  | -      |
| imgCropProps | antd-img-crop 组件的 props | object  | -      |
| appSource    | 上传来源                   | string  | tmp    |
