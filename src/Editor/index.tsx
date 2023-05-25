import Quill from './Quill';

type MergedEditor = {
  Quill: typeof Quill;
};

const Editor = {
  Quill: Quill,
};
export { Quill };
export default Editor as MergedEditor;
