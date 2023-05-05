// 秀米兼容
export const appPanelEmbed = (Quill: any) => {
  // 引入源码中的BlockEmbed
  const BlockEmbed = Quill.import('blots/block/embed');
  // 定义新的blot类型
  class AppPanelEmbed extends BlockEmbed {
    static create(value: string) {
      const node = super.create(value);
      //   设置自定义html
      node.innerHTML = this.transformValue(value);
      return node.firstChild;
    }

    static transformValue(value: string) {
      let handleArr = value.split('\n');
      handleArr = handleArr.map(e => e.replace(/^[\s]+/, '').replace(/[\s]+$/, ''));
      return handleArr.join('');
    }

    // 返回节点自身的value值 用于撤销操作
    static value(node: HTMLElement) {
      return node.innerHTML;
    }
  }

  // blotName
  AppPanelEmbed.blotName = 'AppPanelEmbed';
  // class名将用于匹配blot名称
  AppPanelEmbed.className = 'rich-innerHtml';
  // 标签类型自定义
  AppPanelEmbed.tagName = 'div';
  Quill.register(AppPanelEmbed, true);
};


// 视频兼容
export const simpleVideo = (Quill: any) => {
  const BlockEmbed = Quill.import('blots/block/embed')
  class VideoBlot extends BlockEmbed {
    static create(value) {
      let node = super.create()
      node.setAttribute('src', value.url)
      node.setAttribute('controls', value.controls)
      node.setAttribute('width', value.width)
      node.setAttribute('height', value.height)
      node.setAttribute('webkit-playsinline', true)
      node.setAttribute('playsinline', true)
      node.setAttribute('x5-playsinline', true)
      return node;
    }

    static value(node) {
      return {
        url: node.getAttribute('src'),
        controls: node.getAttribute('controls'),
        width: node.getAttribute('width'),
        height: node.getAttribute('height')
      };
    }
  }

  VideoBlot.blotName = 'simpleVideo'
  VideoBlot.tagName = 'video'
  Quill.register(VideoBlot)
};

export const addSize = (Quill: any, sizeList) => {
  const Size = Quill.import('attributors/style/size');
  Size.whitelist = sizeList; // 定义字体大小白名单

  Quill.register(Size, true);
}
