import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

// The AWS Region can be provided here using the `region` property. If you leave it blank
// the SDK will default to the region set in your AWS config.
export const snsClient = new SNSClient({});

const main = async () => {
  const command = new PublishCommand({ Message: 'halo', TopicArn: 'arn:aws:sns:us-east-1:595156334397:hidahidahida' });
  await snsClient.send(command);
};

main();
