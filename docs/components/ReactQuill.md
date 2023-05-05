## ReactQuill

```tsx
import { Editor } from '@bluedot-tech/bluedot-antd';
import { useEffect, useRef } from 'react';

const xiumiIconBase64 =
  'data:image/png;base64,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';

const addMeta = (metaId: any, name: any, content: any) => {
  const meta = document.createElement('meta');
  meta.content = content;
  meta.id = metaId;
  meta.name = name;
  document.getElementsByTagName('head')[0].appendChild(meta);
};

// 只有meta上有id的才可以使用改方法
const deleteMeta = (metaId: any) => {
  document.getElementById(metaId)?.remove();
};

export default () => {
  const fileInputEl = useRef<HTMLInputElement>(null);
  const quill = useRef<any>(null);

  const handlePhoto = (event: any) => {
    const formData = new FormData();
    // const imgName = file.name.split('.')[0] || '';// 文件名称
    const file = event.target.files[0]; // 文件
    formData.append('file', file);

    console.log('formData', formData);
    // // 接口提交数据示例
    // request('/api/test/', {
    //   method: 'POST',
    //   data: formData,
    // });

    // 模拟接口
    setTimeout(() => {
      // 模拟接口返回数据
      const res = {
        url: 'https://statics.xiumi.us/stc/images/templates-assets/tpl-paper/image/6a40fa711eebd92aa08a8f899535d8e5-sz_114236.jpg',
      };

      const range = quill.current.editor.getSelection();
      // const range = quill.current.getEditor().selection.savedRange; // 获取当前光标位置第二种方法

      quill.current
        .getEditor()
        .insertEmbed(range?.index || 0, 'image', res.url); //将上传好的图片，插入到富文本的range.index（当前光标处）
    }, 1000);
  };

  const Toolbar = () => (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font">
          <option value="arial" selected>
            Arial
          </option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size"></select>
      </span>
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
        <button className="ql-header" value="1"></button>
        <button className="ql-header" value="2"></button>
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
      <span className="ql-formats">
        <input
          type="file"
          ref={fileInputEl} //挂载ref
          accept=".jpg,.jpeg,.png" //限制文件类型
          hidden //隐藏input
          onChange={(event: any) => {
            handlePhoto(event);
          }}
        ></input>
        <button
          className="custom-button-image"
          onClick={() => {
            fileInputEl.current?.click();
          }}
        >
          <svg viewBox="0 0 18 18">
            {' '}
            <rect
              className="ql-stroke"
              height="10"
              width="12"
              x="3"
              y="4"
            ></rect> <circle className="ql-fill" cx="6" cy="7" r="1"></circle> <polyline
              className="ql-even ql-fill"
              points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
            ></polyline>{' '}
          </svg>
        </button>
      </span>
      <span className="ql-formats">
        <button
          id="custom-button-xiumi"
          title="秀米"
          type="button"
          onClick={() => {
            window.open('//xiumi.us/studio/v5#/paper/for/new/cube/0');
          }}
          style={{
            backgroundImage: `url(${xiumiIconBase64})`,
            backgroundSize: '18px 18px',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </span>
    </div>
  );

  useEffect(() => {
    // 解决图片防盗不显示问题
    addMeta('referrer', 'referrer', 'no-referrer');

    window.addEventListener(
      'message',
      function (event) {
        console.log('Inserting html----', event);
      },
      false,
    );

    return () => {
      // 退出页面删除referrer设置避免影响其他页面
      deleteMeta('referrer');
    };
  }, []);

  return (
    <>
      <Editor.ReactQuill
        Toolbar={Toolbar()}
        height={400}
        quillRef={(ref: any) => {
          quill.current = ref;
        }}
        register={(Quill) => {
          // 设置字体
          const Font = Quill.import('formats/font');
          Font.whitelist = [
            'arial',
            'comic-sans',
            'courier-new',
            'georgia',
            'helvetica',
            'lucida',
          ];
          Quill.register(Font, true);
        }}
      />
    </>
  );
};
```

# 注意：

秀米内部的图片后端需要自己做替换。

## API

| 参数          | 说明                                      | 类型            | 默认值 | 版本 |
| ------------- | ----------------------------------------- | --------------- | ------ | ---- |
| height        | 富文本框高度                              | number          | 400    |      |
| initialValues | 富文本输入框中的默认值                    | string          | -      |
| Toolbar       | toobar 设置                               | ReactNode       | -      |
| quillRef      | 富文本 ref 实例                           | function(ref)   | -      |
| onChange      | 富文本框值变化时回调                      | function(value) | -      |
| register      | 注册其他插件                              | function(Quill) | -      |
| 其他参数      | https://quilljs.com/docs/modules/toolbar/ | -               | -      |
