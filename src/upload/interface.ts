import type {
    UploadProps as RcUploadProps,
    UploadFile as RcUploadFile,
    UploadChangeParam as RcUploadChangeParam,
    UploadFileStatus
} from 'antd/lib/upload/interface';
import type {ImgCropProps} from 'antd-img-crop';

export { RcUploadProps, RcUploadFile, RcUploadChangeParam }

export interface UploadImgCropProps {
  maxLength?: number;
  value: string | string[] | undefined;
  onChange?: any;
  accept?: string;

  aspect?: number;
  children?: any;
  showImgCrop: boolean;
  uploadProps: RcUploadProps;
  imgCropProps: ImgCropProps
  appSource: string;
}

