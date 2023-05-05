export interface XiumiProps {
  defValue?: string;
  videoProps?: {
    onChange: (event: any, quill: any) => void;
  };
  imagesProps?: {
    onChange: (event: any, quill: any) => void;
  };
  onChange?: (value?: string) => void;
  quillRef?: (ref?: any)=>void;
}
