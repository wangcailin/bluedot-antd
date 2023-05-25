# Upload.ImgCrop

图片裁剪

```jsx
import { Upload } from '@bluedot-tech/bluedot-antd';

export default () => (
  <Upload.ImgCrop
    uploadProps={{
      headers: {
        Authorization: `Bearer xxxxx`,
      },
      action: `/tenant/system/resource`,
    }}
    imgCropProps={{
      aspect: 1,
    }}
  >
    上传头像
  </Upload.ImgCrop>
);
```
