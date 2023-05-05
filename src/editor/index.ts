import Xiumi from './Xiumi';

type MergedEditor = typeof Xiumi & {
  Xiumi: typeof Xiumi;
};

const Editor = {
  Xiumi
};

export { Xiumi };
export default Editor as MergedEditor;
