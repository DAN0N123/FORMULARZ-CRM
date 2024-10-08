/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { CirclePlus, ClipboardList } from 'lucide-react';
import PhoneNumberInput from './PhoneNumberInput';
import fetcher from '../helpers/fetcher';
import useSWR from 'swr';
import ClientsModal from './ClientsModal';
import ProductModal from './ProductModal';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f28a72',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiDatePickerToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f28a72',
        },
      },
    },
    MuiTimePickerToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f28a72',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: '#f28a72',
        },
      },
    },
  },
});

export default function OrderForm() {
  const { data } = useSWR('http://127.0.0.1:3000/products/get', fetcher);

  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const productsNoTotal = products.map(({ total, ...rest }) => rest);
    let datetime;
    if (date && time) {
      datetime = date.set('hour', time.hour()).set('minute', time.minute());
    } else {
      return console.log('Please select both date and time.');
    }
    const formattedDatetime = datetime.format('YYYY-MM-DD HH:mm');
    const body = { address, phone, products: productsNoTotal, orderNumber };
    try {
      const response = await fetcher(
        'http://127.0.0.1:3000/orders/add',
        'POST',
        body
      );
      resetForm();
    } catch (err) {
      console.log(err);
    }
  }

  function resetForm() {
    setProducts([]);
    setAddress('');
    setPhone('');
    setOrderNumber('');
  }

  function handleClientChoice(address, phone) {
    setAddress(address);
    setPhone(phone);
  }
  function handleAddProduct(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = e.target.querySelector('#productSelect').value;
    const quantity = e.target.querySelector('#quantity').value;
    const product = data.find((product) => product.name === name);
    const productObject = {
      name,
      quantity: quantity,
      price: product.price,
      total: Math.round(quantity * product.price * 100) / 100,
      packagingMethod: product.packagingMethod,
    };
    setProducts([...products, productObject]);
    setProductModal(false);
  }
  return (
    <>
      {clientModal ? (
        <ClientsModal
          setClientModal={setClientModal}
          handleClientChoice={handleClientChoice}
        />
      ) : null}
      {productModal ? (
        <ProductModal
          data={data}
          setProductModal={setProductModal}
          handleAddProduct={handleAddProduct}
        />
      ) : null}
      <form
        className="w-full min-h-full h-fit bg-white p-4 rounded-lg flex flex-col gap-8"
        onSubmit={handleFormSubmit}
      >
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <label htmlFor="order-number"> Nr zamówienia:</label>
          <input
            id="order-number"
            type="number"
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value);
            }}
            required
            className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC] w-[100px]"
          />
        </div>
        <div className="relative flex flex-col gap-2 w-full before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <p> Produkty: </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setProductModal(true);
            }}
            className="flex ml-1 gap-2 items-center"
          >
            <CirclePlus color="#f28a72" />
            <p className="text-coral"> Dodaj Produkt</p>
          </button>
          {products.length > 0 ? (
            <p className="gap-4 p-1 grid grid-cols-4">
              <p> Nazwa: </p>
              <p> Cena: </p>
              <p> Ilość: </p>
              <p> Łącznie: </p>
            </p>
          ) : null}

          {products.map(
            ({ name, price, quantity, total, packagingMethod }, index) => (
              <div
                key={index}
                className="border-[1px] rounded-md p-1 gap-4 grid grid-cols-4 content-center"
              >
                <p> {name} </p>
                <p> {price} </p>
                <p>
                  {' '}
                  {quantity} ({packagingMethod})
                </p>
                <p> {total} zł </p>
              </div>
            )
          )}
          {products.length > 0 ? (
            <div className="gap-4 p-1 flex w-full justify-end">
              <p className="border-[1px] p-1 rounded-md flex gap-2">
                <p> Suma: </p>
                <p>
                  {products.reduce((acc, product) => acc + product.total, 0)} zł
                </p>
              </p>
            </div>
          ) : null}
        </div>
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <label htmlFor="address"> Adres: </label>
          <div
            className="flex ml-1 mb-2 gap-2 items-center"
            onClick={(e) => {
              e.stopPropagation();
              setClientModal(true);
            }}
          >
            <ClipboardList color="#f28a72" />
            <p className="text-coral"> Wybierz z listy</p>
          </div>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
            className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
          />
        </div>
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <PhoneNumberInput
            value={phone}
            change={(value) => {
              setPhone(value);
            }}
          />
        </div>
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <label htmlFor="date"> Data: </label>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
              <MobileDatePicker
                value={date}
                onChange={handleDateChange}
                localeText={{
                  cancelButtonLabel: 'Anuluj',
                  okButtonLabel: 'OK',
                  clearButtonLabel: 'Wyczyść',
                  toolbarTitle: 'Wybierz datę',
                  previousMonth: 'Poprzedni miesiąc',
                  nextMonth: 'Następny miesiąc',
                }}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <label htmlFor="date"> Godzina: </label>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileTimePicker
                value={time}
                onChange={handleTimeChange}
                ampm={false}
                localeText={{
                  toolbarTitle: 'Wybierz godzinę',
                  cancelButtonLabel: 'Anuluj',
                  okButtonLabel: 'OK',
                }}
              />
            </LocalizationProvider>
          </ThemeProvider>
        </div>
        <button
          className="text-xl bg-coral p-4 shadow-md rounded-lg w-fit self-center mt-[2rem]"
          onSubmit={handleFormSubmit}
        >
          Dodaj zamówienie
        </button>
      </form>
    </>
  );
}
