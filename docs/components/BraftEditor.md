## BraftEditor (2.3.0+)

```tsx
import { Editor } from '@bluedot-tech/bluedot-antd';

export default () => {
  const onUploadImage = (param: any) => {
    const formData = new FormData();
    formData.append('file', param.file);
    // request(OSS.option.host, {
    //   method: 'POST',
    //   data: formData,
    // }).then(result => {
    //   param.success({ url: `图片地址` });
    // });
  };

  return (
    <>
      <Editor.BraftEditor
        media={{
          uploadFn: onUploadImage,
          accepts: {
            image:
              'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
          },
        }}
      />
    </>
  );
};
```

# 注意：

秀米内部的图片后端需要自己做替换。

## API

| 参数     | 说明                    | 类型            | 默认值 | 版本 |
| -------- | ----------------------- | --------------- | ------ | ---- |
| style    | 外边框样式              | css             | -      |      |
| onChange | 富文本框值变化时回调    | function(value) | -      |
| 其他参数 | http://braft.margox.cn/ | -               | -      |
