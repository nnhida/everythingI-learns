import { readFile } from 'node:fs/promises';

import { PutObjectCommand, S3Client, S3ServiceException } from '@aws-sdk/client-s3';

const main = async () => {
  const client = new S3Client();
  const file = await readFile('./key.pem');
  const command = new PutObjectCommand({ Bucket: 'hidahidahida', Key: 'aws.pem', Body: file });
  await client.send(command);
};

main();
