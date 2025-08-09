import mongoose from 'mongoose';
import express from 'express';
import Order from '../orders/order.model.js';
import Book from '../books/book.model.js';

const router = express.Router();

// Function to calculate admin stats
router.get('/', async (req, res) => {
  try {
    // 1. Total number of orders
    const totalOrders = await Order.countDocuments();

    // 2. Total sales (sum of all totalPrice from orders)
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);

    // 4. Trending books statistics:
    const trendingBooksCount = await Book.aggregate([{ $match: { trending: true } }, { $count: 'trendingBooksCount' }]);

    const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

    const totalBooks = await Book.countDocuments();

    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Result summary
    res.status(200).json({ totalOrders, totalSales: totalSales[0]?.totalSales || 0, trendingBooks, totalBooks, monthlySales });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Failed to fetch admin stats' });
  }
});

export default router;
