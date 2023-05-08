import { request } from '@umijs/max';
import type { UploadFile } from 'antd/es/upload/interface';

export interface OSSOptions {
  region: string;
  bucket: string;
  accessKeyId: string;
  accessKeySecret: string;
  filepath: string;
}
// export interface OSSData {
//   dir: string;
//   expire: string;
//   host: string;
//   accessId: string;
//   policy: string;
//   signature: string;
// }

export interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}
const url = API_URL_PREFIX + '/backend/system/resource/oss-upload-url';

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

// export const transformFileData = (file: UploadFile) => {
//   return {
//     key: `${OSSData?.dir}/${getUploadFileName(file)}`,
//     OSSAccessKeyId: OSSData?.accessId,
//     policy: OSSData?.policy,
//     Signature: OSSData?.signature,
//   };
// };

// const oss = await getUploadUrl();
// export const OSS = {
//   option: {
//     dir: `${oss.dir}${moment().format('YYYYMM')}/`,
//     expire: oss.expire,
//     host: oss.host,
//     accessId: oss.accessid,
//     policy: oss.policy,
//     signature: oss.signature,
//   },
//   getUploadFileName: (file: UploadFile) => {
//     const suffix = file.name.slice(file.name.lastIndexOf('.'));
//     return `${file.uid}${suffix}`;
//   },
//   setUploadFileUrl: (file: UploadFile) => {
//     file.url = `${OSS.option.host}/${OSS.option.dir}${OSS.getUploadFileName(
//       file,
//     )}`;
//     return file;
//   },
//   transformFile: (file: UploadFile) => {
//     const filename = OSS.getUploadFileName(file);
//     console.log('transformFile.filename', filename);
//     file.path = OSS.option.dir + filename;
//     file.url = OSS.option.host + '/' + OSS.option.dir + filename;
//     console.log('transformFile.file', file);
//     return file;
//   },
//   getExtraData: async (file: UploadFile) => {
//     return {
//       key: `${OSS.option.dir}${OSS.getUploadFileName(file)}`,
//       policy: oss.policy,
//       OSSAccessKeyId: oss.accessid,
//       // callback:oss.callback,
//       success_action_status: 200,
//       signature: oss.signature,
//     };
//   },
//   upload: (file: any) => {
//     const transformFile = OSS.transformFile(file);
//     const extraData = OSS.getExtraData(file);
//     const formData = new FormData();

//     for (const key in extraData) {
//       if (Object.prototype.hasOwnProperty.call(extraData, key)) {
//         formData.append(key, extraData[key]);
//       }
//     }
//     formData.append('file', transformFile, transformFile.name);

//     return new Promise((resolve, reject) => {
//       request(OSS.option.host, {
//         method: 'POST',
//         body: formData,
//       })
//         .then((result) => {
//           console.log(result, 'res');
//           console.log(transformFile, 'res');
//           resolve(transformFile);
//         })
//         .catch((error) => {
//           reject({ state_code: 500 });
//         });
//     });
//   },
// };

// export default OSS;
