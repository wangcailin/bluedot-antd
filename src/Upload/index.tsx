import File from './File';
import ImgCrop from './ImgCrop';

type MergedUpload = {
  ImgCrop: typeof ImgCrop;
  File: typeof File;
};

const Upload = {
  ImgCrop: ImgCrop,
  File: File,
};
export { ImgCrop, File };
export default Upload as MergedUpload;
