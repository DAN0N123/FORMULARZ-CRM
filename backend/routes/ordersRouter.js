const express = require('express');
const router = express.Router();
const connection = require('../database');
const { Order } = connection.models;
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');

router.post('/add', [
  body('orderNumber').trim().isLength({ min: 1 }),
  body('address').trim().isLength({ min: 1 }),
  body('phone').trim().isLength({ min: 11 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(500)
        .json({ ok: false, message: 'Wprowadź poprawne dane' });
    }
    const orderNumber = req.body.orderNumber;
    const address = req.body.address;
    const phone = req.body.phone;
    const products = req.body.products;
    const orderNumberCheck = await Order.findOne({
      orderNumber: orderNumber,
    }).exec();
    if (orderNumberCheck) {
      return res.json({
        ok: false,
        message: 'Zamówienie o tym numerze już istnieje',
      });
    }

    const newOrder = new Order({ address, orderNumber, products, phone });

    try {
      newOrder.save();
      return res.json({
        ok: true,
        message: 'Pomyślnie dodano nowe zamówienie',
      });
    } catch (err) {
      return res.json({
        ok: false,
        message: 'Wystąpił problem przy dodawaniu nowego zamówienia',
      });
    }
  }),
]);

router.get(
  '/get',
  asyncHandler(async (req, res) => {
    try {
      const allOrders = await Order.find().exec();
      return res.json({ ok: true, result: allOrders });
    } catch (err) {
      return res.json({
        ok: false,
        error: err,
        message: 'Wystąpił problem przy zwracaniu zamówień. Odśwież stronę',
      });
    }
  })
);

module.exports = router;
