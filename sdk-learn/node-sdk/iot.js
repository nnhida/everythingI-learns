import awsIot from 'aws-iot-device-sdk';

const topic = 'hidatopic';

const device = awsIot.device({
  keyPath: '../python-iot/private.key',
  certPath: '../python-iot/certificate.crt',
  caPath: '../python-iot/rootca.pem',
  clientId: 'hidahidahida',
  host: 'a37bz4hrf4lhrt-ats.iot.us-east-1.amazonaws.com',
});

device.on('connect', async () => {
  while (true) {
    device.publish(topic, JSON.stringify({ temperature: Math.floor(Math.random() * 100), humidity: Math.floor(Math.random() * 60) }));
    console.log('published .topic');
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});
