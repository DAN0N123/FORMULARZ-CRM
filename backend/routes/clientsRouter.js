const express = require('express');
const router = express.Router();
const connection = require('../database');
const { Client } = connection.models;
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

router.get(
  '/get',
  asyncHandler(async (req, res) => {
    const allClients = await Client.find().exec();
    return res.json({ ok: true, result: allClients });
  })
);

module.exports = router;
