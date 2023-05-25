import { request } from '@umijs/max';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

export interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}
const url = API_URL + API_URL_PREFIX + OSS_URL;

export const getOSSData = async () => {
  return await request(url);
};

export const getUploadFileName = (file: UploadFile) => {
  const suffix = file.name.slice(file.name.lastIndexOf('.'));
  const filename = file.uid + suffix;
  return filename;
};

export const getUploadExtraData = (OSSData: OSSDataType, file: UploadFile) => {
  return {
    key: `${OSSData?.dir}/${getUploadFileName(file)}`,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  };
};

export const uoploadRequest = async (file: UploadFile) => {
  const timestamp = Date.now();
  if (!file?.uid) {
    file.uid = timestamp;
  }
  const ossData = await getOSSData();
  const extraData: any = getUploadExtraData(ossData, file);

  const formData = new FormData();
  for (const key in extraData) {
    if (Object.prototype.hasOwnProperty.call(extraData, key)) {
      formData.append(key, extraData[key]);
    }
  }
  formData.append('file', file);
  await request(ossData.host, {
    method: 'POST',
    data: formData,
  });
  file.url = `${ossData.host}/${extraData.key}`;
  return file;
};

export const customRequest: UploadProps['customRequest'] = async ({
  onProgress,
  onError,
  onSuccess,
  file,
}) => {
  const ossData = await getOSSData();
  const extraData: any = getUploadExtraData(ossData, file);

  const formData = new FormData();
  for (const key in extraData) {
    if (Object.prototype.hasOwnProperty.call(extraData, key)) {
      formData.append(key, extraData[key]);
    }
  }
  formData.append('file', file);

  try {
    const response = await request(ossData.host, {
      method: 'POST',
      data: formData,
      onUploadProgress: (event) => {
        if (event.lengthComputable) {
          const percent = Math.floor((event.loaded * 100) / event.total);
          onProgress({ percent });
        }
      },
    });
    file.url = `${ossData.host}/${extraData.key}`;
    onSuccess(file, response);
  } catch (error) {
    onError(error);
  }
};
