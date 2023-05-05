## 加密

### 注意：需要设置 PUBLICKEY

#### 路径：/config/define.ts

```tsx
import { Crypto } from '@bluedot-tech/bluedot-antd';
import { useEffect, useState } from 'react';

export default () => {
  const [formValues, setFormValues] = useState('');

  useEffect(() => {
    const crypt = new Crypto();
    const crypt_key = crypt.rsa_key_encrypt();

    const email = 'yue.wang@blue-dot.cn';
    const formValues = {
      crypt_key,
      email: crypt.aes_encrypt(email),
    };

    setFormValues(formValues);
  }, []);
  return (
    <div>
      <div style={{ 'word-break': 'break-all' }}>
        <b>crypt_key：</b>
        {formValues.crypt_key}
      </div>
      <div>
        <b>email：</b>
        {formValues.email}
      </div>
    </div>
  );
};
```
