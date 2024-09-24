import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import PhoneNumberInput from './PhoneNumberInput';
export default function OrderForm() {
  const [products, setProducts] = useState([
    {
      name: 'Dynia',
      price: 1.2,
      quantity: 2,
      total: 2.4,
    },
    {
      name: 'Koper',
      price: 2.4,
      quantity: 4,
      total: 9.6,
    },
  ]);

  return (
    <form className="w-full h-full bg-white p-4 m-2 rounded-lg flex flex-col gap-8">
      <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
        <label htmlFor="order-number"> Nr zamówienia:</label>
        <input
          id="order-number"
          type="number"
          className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC] w-[100px]"
        />
      </div>
      <div className="relative flex flex-col gap-2 w-full before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
        <p> Produkty: </p>
        <p className="flex ml-4 gap-2">
          <CirclePlus color="#B4DFE5" />
          <p className="text-blue"> Dodaj Produkt</p>
        </p>
        <p className="gap-4 p-1 grid grid-cols-4">
          <p> Nazwa: </p>
          <p> Cena: </p>
          <p> Ilość: </p>
          <p> Łącznie: </p>
        </p>
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
        <div className="gap-4 p-1 flex w-full justify-end">
          <p className="border-[1px] p-1 rounded-md flex gap-2">
            <p> Suma: </p>
            <p>
              {products.reduce((acc, product) => acc + product.total, 0)} zł
            </p>
          </p>
        </div>
      </div>
      <div className="relative flex flex-col gap-1 before:absolute before:content-[''] before:w-full before:h-[2px] before:bg-[#CCCCCC] before:-bottom-4">
        <label htmlFor="address"> Adres: </label>
        <input
          type="text"
          id="address"
          className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
        />
      </div>
      <PhoneNumberInput />
    </form>
  );
}
