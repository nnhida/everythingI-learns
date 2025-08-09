import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.API_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// routes
import bookRoutes from './src/books/book.route.js';
import orderRoutes from './src/orders/order.route.js';
import userRoutes from './src/users/user.route.js';
import adminRoutes from './src/stats/admin.stats.js';

app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Book Store Server is running!');
  });
}

main()
  .then(() => console.log('Mongodb connect successfully!'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
