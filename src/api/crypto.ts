const dec = new TextDecoder();
const enc = new TextEncoder();

const getPasswordKey = (password: string): PromiseLike<CryptoKey> =>
  crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = (
  passwordKey: CryptoKey,
  salt: Uint8Array,
  keyUsage: CryptoKey["usages"],
  iterations: number = 10000
): PromiseLike<CryptoKey> =>
  crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: iterations,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage
  );

export async function encrypt(
  data: string,
  password: string,
  iterations = 10000
) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ["encrypt"], iterations);
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    enc.encode(data)
  );

  const encryptedContentArr = new Uint8Array(encryptedContent);
  let iterationsArr = new Uint8Array(enc.encode(iterations.toString()));

  let buff = new Uint8Array(
    iterationsArr.byteLength +
      salt.byteLength +
      iv.byteLength +
      encryptedContentArr.byteLength
  );
  let bytes = 0;
  buff.set(iterationsArr, bytes);
  buff.set(salt, (bytes += iterationsArr.byteLength));
  buff.set(iv, (bytes += salt.byteLength));
  buff.set(encryptedContentArr, (bytes += iv.byteLength));

  return buff.buffer;
}

export async function decrypt(
  encryptedData: ArrayBuffer,
  password: string
): Promise<ArrayBuffer> {
  const encryptedDataBuff = new Uint8Array(encryptedData);

  let bytes = 0;
  const iterations = Number(
    dec.decode(encryptedDataBuff.slice(bytes, (bytes += 5)))
  );

  const salt = new Uint8Array(encryptedDataBuff.slice(bytes, (bytes += 16)));
  const iv = new Uint8Array(encryptedDataBuff.slice(bytes, (bytes += 12)));
  const data = new Uint8Array(encryptedDataBuff.slice(bytes));

  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey(passwordKey, salt, ["decrypt"], iterations);
  const decryptedContent = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    aesKey,
    data
  );

  return decryptedContent;
}
