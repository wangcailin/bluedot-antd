import type { ImgCropProps } from 'antd-img-crop';
import type {
  UploadChangeParam as RcUploadChangeParam,
  UploadFile as RcUploadFile,
  UploadProps as RcUploadProps,
} from 'antd/lib/upload/interface';

export { RcUploadProps, RcUploadFile, RcUploadChangeParam };

export interface UploadImgCropProps {
  maxCount?: number;
  value: string | string[] | undefined;
  onChange?: any;
  accept?: string;

  aspect?: number;
  children?: any;
  showImgCrop: boolean;
  uploadProps: RcUploadProps;
  imgCropProps: ImgCropProps;
  appSource: string;
}
