require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');
const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  packagingMethod: String,
  image: { type: String, default: null },
});

const clientSchema = new mongoose.Schema({
  address: String,
  phone: String,
});

const Product = connection.model('Product', productSchema);
const Client = connection.model('Client', clientSchema);

module.exports = connection;
