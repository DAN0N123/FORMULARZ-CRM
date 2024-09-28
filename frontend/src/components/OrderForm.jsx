/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { CirclePlus, X } from 'lucide-react';
import PhoneNumberInput from './PhoneNumberInput';
import { defaultProducts } from '../constants';
export default function OrderForm() {
  const [products, setProducts] = useState([]);

  const [modalActive, setModalActive] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleAddProduct(e) {
    e.preventDefault();
    e.stopPropagation();

    const name = e.target.querySelector('#productSelect').value;
    const quantity = e.target.querySelector('#quantity').value;
    const price = 2;
    const productObject = {
      name,
      quantity,
      price: price,
      total: quantity * price,
    };
    setProducts([...products, productObject]);
    setModalActive(false);
  }

  return (
    <>
      {modalActive ? (
        <div className="absolute flex inset-0 justify-center pt-[30%] w-screen h-screen">
          <div className="fixed w-[9999px] h-[9999px] top-0 left-0 backdrop-blur-sm z-[9998]"></div>
          <form
            className="relative w-[80vw] h-[35vh] bg-white shadow-xl border-[1px] border-darkBlue rounded-lg z-[9999] p-4 pt-8 flex flex-col gap-4"
            onSubmit={handleAddProduct}
          >
            <button
              className="absolute right-2 top-2"
              onClick={() => {
                setModalActive(false);
              }}
            >
              <X />
            </button>
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="productSelect" className="text-lg">
                {' '}
                Produkt:{' '}
              </label>
              <select
                name="productSelect"
                id="productSelect"
                required
                className="w-min p-2 border-[1px] border-[#CCCCCC]"
              >
                <option value=""> - Wybierz z listy -</option>
                <optgroup label="Produkty">
                  {defaultProducts.map(({ name }, index) => (
                    <option value={name} key={index}>
                      {' '}
                      {name}{' '}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <label htmlFor="quantity" className="text-lg">
                {' '}
                Ilość:{' '}
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                defaultValue={1}
                required
                className="w-[100px] border-[1px] border-[#CCCCCC] p-1"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <button className="w-full flex justify-center items-center  h-[50px] bg-[#B4DFE550]">
                Dodaj
              </button>
            </div>
          </form>
        </div>
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
            required
            className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC] w-[100px]"
          />
        </div>
        <div className="relative flex flex-col gap-2 w-full before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <p> Produkty: </p>
          <button
            onClick={() => {
              setModalActive(true);
            }}
            className="flex ml-4 gap-2 items-center"
          >
            <CirclePlus color="#B4DFE5" />
            <p className="text-blue"> Dodaj Produkt</p>
          </button>
          {products.length > 0 ? (
            <p className="gap-4 p-1 grid grid-cols-4">
              <p> Nazwa: </p>
              <p> Cena: </p>
              <p> Ilość: </p>
              <p> Łącznie: </p>
            </p>
          ) : null}

          {products.map(({ name, price, quantity, total }, index) => (
            <div
              key={index}
              className="border-[1px] rounded-md p-1 gap-4 grid grid-cols-4 content-center"
            >
              <p> {name} </p>
              <p> {price} </p>
              <p> {quantity} </p>
              <p> {total} zł </p>
            </div>
          ))}
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
          <input
            type="text"
            id="address"
            required
            className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
          />
        </div>
        <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
          <PhoneNumberInput />
        </div>
        <button
          className="text-xl bg-blue p-4 shadow-md rounded-lg w-fit self-center mt-[2rem]"
          onSubmit={handleFormSubmit}
        >
          Dodaj zamówienie
        </button>
      </form>
    </>
  );
}
