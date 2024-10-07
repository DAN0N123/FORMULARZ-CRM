/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { CirclePlus, ClipboardList } from 'lucide-react';
import PhoneNumberInput from './PhoneNumberInput';
import fetcher from '../helpers/fetcher';
import useSWR from 'swr';
import ClientsModal from './ClientsModal';
import ProductModal from './ProductModal';
export default function OrderForm() {
  const { data } = useSWR('http://127.0.0.1:3000/products/get', fetcher);

  const [products, setProducts] = useState([]);
  const [productModal, setProductModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  async function handleFormSubmit(e) {
    e.preventDefault();
    const body = { address, phone, products, orderNumber };
    try {
      const response = await fetcher(
        'http://127.0.0.1:3000/orders/add',
        'POST',
        body
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
