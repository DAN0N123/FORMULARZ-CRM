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
  seasonal: Boolean,
});

const clientSchema = new mongoose.Schema({
  address: String,
  phone: String,
});

const orderSchema = new mongoose.Schema({
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const defaultProducts = [
  {
    name: 'Jaja z wolnego wybiegu (M/L)',
    price: 1.2,
    packagingMethod: 'sztuki',
    image: '/jaja_z_wolnego_wybiegu_ml.png',
    seasonal: false,
  },
  {
    name: 'Jaja z wolnego wybiegu (S)',
    price: 0.7,
    packagingMethod: 'sztuki',
    image: '/jaja_z_wolnego_wybiegu_s.png',
    seasonal: false,
  },
  {
    name: 'Jaja z wolnego wybiegu (S/M)',
    price: 0.8,
    packagingMethod: 'sztuki',
    image: '/jaja_z_wolnego_wybiegu_sm.png',
    seasonal: false,
  },
  {
    name: 'Jaja z wolnego wybiegu (M)',
    price: 1,
    packagingMethod: 'sztuki',
    image: '/jaja_z_wolnego_wybiegu_m.png',
    seasonal: false,
  },
  {
    name: 'Jaja z wolnego wybiegu (L/XL)',
    price: 1.3,
    packagingMethod: 'sztuki',
    image: '/jaja_z_wolnego_wybiegu_lxl.png',
    seasonal: false,
  },
  {
    name: 'Dynia',
    price: 8,
    packagingMethod: 'kg',
    image: '/dynia.png',
    seasonal: false,
  },
  {
    name: 'Buraki',
    price: 6,
    packagingMethod: 'kilogramy',
    image: '/buraki.png',
    seasonal: false,
  },
  {
    name: 'Marchew',
    price: 7,
    packagingMethod: 'kilogramy',
    image: '/marchew.png',
    seasonal: false,
  },
  {
    name: 'Ziemniaki',
    price: 5,
    packagingMethod: 'kilogramy',
    image: '/ziemniaki.png',
    seasonal: false,
  },
  {
    name: 'Cebula',
    price: 6,
    packagingMethod: 'kilogramy',
    image: '/cebula.png',
    seasonal: false,
  },
  {
    name: 'Czarna rzodkiew',
    price: 8,
    packagingMethod: 'kilogramy',
    image: '/czarna_rzodkiew.png',
    seasonal: false,
  },
  {
    name: 'Czosnek',
    price: 4,
    packagingMethod: 'główki',
    image: '/czosnek.png',
    seasonal: false,
  },
  {
    name: 'Seler duży',
    price: 7,
    packagingMethod: 'sztuki',
    image: '/seler_duzy.png',
    seasonal: false,
  },
  {
    name: 'Por duży',
    price: 7,
    packagingMethod: 'sztuki',
    image: '/por_duzy.png',
    seasonal: false,
  },
  {
    name: 'Ogórki kiszone',
    price: 15,
    packagingMethod: 'słoik 0.9l',
    image: '/ogorki_kiszone.png',
    seasonal: false,
  },
  {
    name: 'Kapusta kiszona',
    price: 15,
    packagingMethod: 'słoik 0.9l',
    image: '/kapusta_kiszona.png',
    seasonal: false,
  },
  {
    name: 'Zakwas buraczany 0.5l',
    price: 14,
    packagingMethod: 'butelka 0.5l',
    image: '/zakwas_buraczany_05l.png',
    seasonal: false,
  },
  {
    name: 'Zakwas buraczany 1l',
    price: 20,
    packagingMethod: 'butelka 1l',
    image: '/zakwas_buraczany_1l.png',
    seasonal: false,
  },
  {
    name: 'Rukola',
    price: 7,
    packagingMethod: 'paczki',
    image: '/rukola.png',
    seasonal: false,
  },
  {
    name: 'Szpinak',
    price: 7,
    packagingMethod: 'porcje',
    image: '/szpinak.png',
    seasonal: false,
  },
  {
    name: 'Sałata',
    price: 7,
    packagingMethod: 'paczki',
    image: '/salata.png',
    seasonal: false,
  },
  {
    name: 'Szczaw',
    price: 7,
    packagingMethod: 'paczki',
    image: '/szczaw.png',
    seasonal: false,
  },
  {
    name: 'Słonecznik główka (duża)',
    price: 10,
    packagingMethod: 'sztuki',
    image: '/slonecznik_duza.png',
    seasonal: false,
  },
  {
    name: 'Słonecznik główka (średnia)',
    price: 7,
    packagingMethod: 'sztuki',
    image: '/slonecznik_srednia.png',
    seasonal: false,
  },
  {
    name: 'Słonecznik główka (mała)',
    price: 4,
    packagingMethod: 'sztuki',
    image: '/slonecznik_mala.png',
    seasonal: false,
  },
  {
    name: 'Rabarbar',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/rabarbar.png',
    seasonal: false,
  },
  {
    name: 'Burak liściowy',
    price: 6,
    packagingMethod: 'wiązki',
    image: '/burak_lisciowy.png',
    seasonal: false,
  },
  {
    name: 'Natka pietruszki',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/natka_pietruszki.png',
    seasonal: false,
  },
  {
    name: 'Koperek',
    price: 6,
    packagingMethod: 'wiązki',
    image: '/koperek.png',
    seasonal: false,
  },
  {
    name: 'Lubczyk',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/lubczyk.png',
    seasonal: false,
  },
  {
    name: 'Jarmuż',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/jarmuz.png',
    seasonal: false,
  },

  // Sezonowe produkty
  {
    name: 'Cukinia',
    price: 3,
    packagingMethod: 'sztuki',
    image: '/cukinia.png',
    seasonal: true,
  },
  {
    name: 'Patison',
    price: 3,
    packagingMethod: 'sztuki',
    image: '/patison.png',
    seasonal: true,
  },
  {
    name: 'Kwiaty cukinii',
    price: 1.5,
    packagingMethod: 'sztuki',
    image: '/kwiaty_cukinii.png',
    seasonal: true,
  },
  {
    name: 'Liście selera',
    price: 5,
    packagingMethod: 'wiązki',
    image: '/liście_selera.png',
    seasonal: true,
  },
  {
    name: 'Liście chrzanu',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/liście_chrzanu.png',
    seasonal: true,
  },
  {
    name: 'Botwina',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/botwina.png',
    seasonal: true,
  },
  {
    name: 'Młoda marchew',
    price: 7,
    packagingMethod: 'pęczki',
    image: '/mloda_marchew.png',
    seasonal: true,
  },
  {
    name: 'Szczypiorek',
    price: 7,
    packagingMethod: 'wiązki',
    image: '/szczypiorek.png',
    seasonal: true,
  },
  {
    name: 'Młody seler',
    price: 5,
    packagingMethod: 'sztuki',
    image: '/mlody_seler.png',
    seasonal: true,
  },
  {
    name: 'Młody por',
    price: 5,
    packagingMethod: 'sztuki',
    image: '/mlody_por.png',
    seasonal: true,
  },
  {
    name: 'Koper do kiszenia',
    price: 5,
    packagingMethod: 'wiązki',
    image: '/koper_do_kiszenia.png',
    seasonal: true,
  },
];

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return Product.insertMany(defaultProducts);
  })
  .then(() => {
    console.log('Documents inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting documents:', err);
    mongoose.connection.close();
  });

const Product = connection.model('Product', productSchema);
const Client = connection.model('Client', clientSchema);
const Order = connection.model('Order', orderSchema);

module.exports = connection;
