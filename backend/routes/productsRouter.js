const express = require('express');
const router = express.Router();
const connection = require('../database');
const { Product } = connection.models;
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

router.get(
  '/get',
  asyncHandler(async (req, res) => {
    const allProducts = await Product.find().exec();
    return res.json({ ok: true, result: allProducts });
  })
);

router.post('/add', [
  body('name').trim().isLength({ min: 1 }),
  body('price').trim().isLength({ min: 1 }),
  body('packaging').trim().isLength({ min: 1 }),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        ok: false,
        error: errors,
        message: 'Wprowadź poprawne dane',
      });
    }
    const newProduct = new Product({
      name: req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1),
      price: req.body.price,
      packagingMethod: req.body.packaging,
      seasonal: req.body.seasonal,
      image: req.body.image,
    });

    try {
      newProduct.save();
      return res.json({ ok: true, message: 'Pomyślnie dodano produkt' });
    } catch (err) {
      return res
        .status(500)
        .json({ ok: false, message: 'Problem przy dodawaniu produktu' });
    }
  }),
]);

module.exports = router;
