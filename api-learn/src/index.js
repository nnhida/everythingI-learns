import express from 'express';

const app = express();
app.get('/watch', (req, res) => {
  res.json({ pesan: 'halo' });
});
app.listen(5000, () => {
  console.log('successed');
});
