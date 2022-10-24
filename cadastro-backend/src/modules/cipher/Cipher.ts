import crypto from 'crypto';

const cryptoInfo: { algorithm: string, secret: string, type: BufferEncoding } = {
  algorithm: 'aes256',
  secret: 'supersecretkey',
  type: 'hex'
}

export const encrypt = (data: string): string => {

  const cipher = crypto.createCipher(cryptoInfo.algorithm, cryptoInfo.secret);

  cipher.update(data)

  return cipher.final(cryptoInfo.type)
}
