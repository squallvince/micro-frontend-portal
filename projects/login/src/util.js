const Buffer = require('safe-buffer').Buffer;

export default function getBase64String(original) {
  return Buffer.from(original).toString('base64');
};
