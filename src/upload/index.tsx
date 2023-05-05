import ImgCrop from './ImgCrop';

type MergedUpload = {
  ImgCrop: typeof ImgCrop;
};

const Upload = {
  ImgCrop: ImgCrop,
};
export { ImgCrop };
export default Upload as MergedUpload;
