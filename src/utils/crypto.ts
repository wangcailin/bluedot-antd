/**
 * num + content  aes对称加密    params1
 * num + 公钥      rsa非对称加密  params2
 * 客户端
 * 1.接收服务端传过来的公钥publicKey
 * 2.本地生成随机数num，通过与公钥进行rsa非对称加密生成params2，通过与content进行aes对称加密生成params1，发送给服务端
 * 3.接收服务端传过来的响应result，通过num进行对称解密
 * 服务端
 * 1.生成一对公钥和私钥，把公钥、对称加密的加密模式发送给客户端
 * 2.接收客户端传过来的params1、params2，把params2通过非对称rsa解密，得到num，然后通过对称解密aes，得到content
 * 3.把http响应数据result与num进行aes对称加密，发给客户端
 */
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

export default class Crypt {
  iv;
  key;
  publicKey: string = PUBLICKEY;

  constructor(iv?: string, key?: string) {
    this.iv = iv ?? CryptoJS.lib.WordArray.random(128 / 16).toString(CryptoJS.enc.Hex);
    this.key = key ?? CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  }

  aes_encrypt(text: string) {
    if (text) {
      try {
        const encoded = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        return encoded.toString();
      } catch (err) {
        return err;
      }
    }
    return '';
  }

  aes_decrypt = (text: string) => {
    if (text) {
      try {
        const decode = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(this.key), {
          iv: CryptoJS.enc.Utf8.parse(this.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        return decode.toString(CryptoJS.enc.Utf8);
      } catch (err) {
        return err;
      }
    }
    return '';
  };

  rsa_key_encrypt = () => {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.publicKey);
    return encrypt.encrypt(JSON.stringify({ iv: this.iv, key: this.key })); // 把Key进行非对称加密
  };
}
