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

module.exports = router;
