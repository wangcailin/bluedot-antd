// @ts-nocheck
import React, { useMemo, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { appPanelEmbed, simpleVideo, addSize } from '../utils/blot';
import { XiumiProps } from './interface';
import './Xiumi.less';

import UploadVideo from './components/UploadVideo';
import FormatBrush, { copyFormatBrush } from './components/FormatBrush';

appPanelEmbed(Quill);
simpleVideo(Quill);

const sizeList = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '38px', '44px', '50px'];
addSize(Quill, sizeList);

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


const ToolbarDom = ({ quill, imagesProps, videoProps }) => {
  const fileInputEl = useRef<HTMLInputElement>(null);

  return (
    <div id="toolbar">
      <FormatBrush />
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-size">
          {
            sizeList.map(item => (<option key={item} value={item}>{item}</option>))
          }
        </select>
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
      <UploadVideo
        {...videoProps}
        onChange={(params) => {
          videoProps?.onChange(params, quill.current);
        }}
      />
      <span className="ql-formats">
        <input
          type="file"
          accept=".jpg,.jpeg,.png" //限制文件类型
          {...imagesProps}
          ref={fileInputEl} //挂载ref
          style={{ display: 'none' }}
          onChange={(event: any) => {
            imagesProps?.onChange(event, quill.current);
          }}
        />
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
  )
};

const CurrentBraftEditor: React.FC<XiumiProps> = (
  {
    initialValues = '',
    value = '',
    Toolbar = null,
    onChange,
    quillRef,
    imagesProps,
    videoProps,
    modules = {},
    height = 400,
    style = {},
    register,
    ...props
  },
) => {
  const quill = useRef<any>(null);
  const [currentValue, setCurrentValue] = useState('');
  const [showQuill, setShowQuill] = useState(false);

  const handelModules = useMemo(() => {
    {
      let currentModules = {
        toolbar: {
          container: '#toolbar',
          ...modules?.toolbar,
          handlers: {
            ...modules?.toolbar?.handlers,
            formatBrush: copyFormatBrush,
          }
        },
      };

      currentModules = {
        ...modules,
        ...currentModules,
      };
      return currentModules;
    }
  }, []);

  const setRichText = async (_HTML: any, t: any) => {
    const _index = t || quill.current.getEditor().selection.savedRange?.index || 0;
    quill.current.getEditor().insertEmbed(_index, 'AppPanelEmbed', _HTML);
  };

  const setPasteRichText = async (_HTML: any, t: any) => {
    quill.current.getEditor().clipboard.dangerouslyPasteHTML(_HTML);
  };

  const handleRichText = async (item: any, index: number) => {
    if (item.localName === 'section') {
      setRichText(item.outerHTML, index);
    } else {
      const _HTML = item.outerHTML;
      try {
        if (_HTML) quill.current.getEditor().clipboard.dangerouslyPasteHTML(index, _HTML);
      } catch (error) {
        console.error('clipboard.dangerouslyPasteHTML------', error);
      }
    };
  };

  const nodesInQuill = (originNode: any, isIndex: boolean) => {
    originNode.forEach((item: any) => {
      handleRichText(item, isIndex ? quill.current.getEditor().getLength() : undefined);
    });
  };

  const listenPaste = () => {
    document
      .querySelector('.quill-editor')
      .addEventListener('paste', (e: any) => {
        const msg = (e.clipboardData || window.clipboardData).getData(
          'text/html',
        ); // 获取粘贴板文本
        if (msg) {
          if (msg.indexOf('xiumi.us') > -1 || msg.indexOf('_135editor') > -1) {
            let value = new DOMParser().parseFromString(msg, 'text/html').body
              .childNodes; // 获取nodes
            e.preventDefault(); // 阻止复制动作
            e.stopPropagation(); // 阻止冒泡
            nodesInQuill(value); // 根据不同标签，使用不同的插入方法
          }
        }
      });
  };
  // 设置默认值
  const defValueSetHtml = (val: string) => {
    if (val) {
      // 清空富文本内部其他数据
      quill.current.getEditor().clipboard.dangerouslyPasteHTML('');

      // 判断是否有秀米元素
      if (val.indexOf('section') > -1 || val.indexOf('section') > -1) {
        let originNode = new DOMParser().parseFromString(val, 'text/html')
          .body.childNodes;
        nodesInQuill(originNode, true);
      } else {
        // 正常插入
        quill.current.getEditor().clipboard.dangerouslyPasteHTML(val);
      };
    };
  };

  useEffect(() => {
    // 解决图片防盗不显示问题
    addMeta('referrer', 'referrer', 'no-referrer');

    setTimeout(() => {
      setShowQuill(true);
    }, 0);

    return () => {
      // 退出页面删除referrer设置避免影响其他页面
      deleteMeta('referrer');
    };
  }, []);

  // 判断value变化是否由form.setFieldsValue引起的。
  useEffect(() => {
    if (showQuill) {
      if (value != currentValue) {
        // form.setFieldsValue 触发
        defValueSetHtml(value);
        // 尾部自动加一个空回车。（兼容如果没有回车秀米无法删除问题）
        quill.current.editor.insertText(quill.current.getEditor().getLength(), '\n');
      } else {
        // console.log('用户自己触发！');
      };
    };
  }, [showQuill, value]);

  useEffect(() => {
    if (showQuill) {
      register?.(Quill);

      listenPaste();

      window.setRichText = setRichText;
      window.setPasteRichText = setPasteRichText;
      window.defValueSetHtml = defValueSetHtml;
    }
  }, [showQuill]);

  return (
    <div className="quill-xiumi-all-dom">
      <ToolbarDom
        quill={quill}
        imagesProps={imagesProps}
        videoProps={videoProps}
      />
      {
        showQuill ? (
          <ReactQuill
            {...props}
            modules={handelModules}
            className="quill-editor"
            onChange={e => {
              setCurrentValue(e);
              onChange?.(e);
            }}
            style={{
              height,
              ...style
            }}
            ref={(el: any) => {
              quillRef?.(el);
              return quill.current = el;
            }}
          />
        ) : null
      }
    </div>
  );
};

export default CurrentBraftEditor;
