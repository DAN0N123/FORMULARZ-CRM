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
    const orderNumberCheck = await Order.findOne({
      orderNumber: orderNumber,
    }).exec();
    if (orderNumberCheck) {
      return res.json({
        ok: false,
        message: 'Zamówienie o tym numerze już istnieje',
      });
    }

    console.log(orderNumber, address, phone, products);
  }),
]);

module.exports = router;
