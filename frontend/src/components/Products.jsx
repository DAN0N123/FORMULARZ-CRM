/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { defaultProducts } from '../constants';
import { CirclePlus, X } from 'lucide-react';
import Product from './Product';
import DropdownMenu from './DropdownMenu';
export default function Products() {
  const [products, setProducts] = useState(defaultProducts);
  const [formActive, setFormActive] = useState(false);
  return (
    <div className="w-full box-border grid grid-cols-1 gap-4 p-4 no-scrollbar overflow-y-auto">
      {formActive ? (
        <div className="w-full  flex justify-center">
          <div className="relative w-[80%] flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
            <button
              className="absolute top-[0.5rem] right-[0.5rem]"
              onClick={() => {
                setFormActive(false);
              }}
            >
              <X color="#00000070" />
            </button>
            <div className="flex flex-col gap-1">
              <label htmlFor="productName"> Nazwa: </label>
              <input
                type="text"
                required
                id="productName"
                className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="productName"> Cena: </label>
              <input
                type="number"
                required
                id="productName"
                className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="productName"> Sposób pakowania: </label>
              <DropdownMenu options={['sztuki', 'kg', 'wiązki']} />
            </div>
            <button className="border-[1px] rounded-full bg-[#00000020] p-2 active:scale-[101%]">
              {' '}
              Dodaj{' '}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex w-full items-center justify-center gap-4 bg-blue p-3 shadow-md rounded-full"
          onClick={() => {
            setFormActive(true);
          }}
        >
          <CirclePlus color="#303c6c" width={'2rem'} height={'auto'} />
          <p className="text-xl">Dodaj produkt</p>
        </button>
      )}
      {products.map(({ id, name, price, packaging, src }) => (
        <Product
          key={id}
          uniqueId={id}
          name={name}
          initPrice={price}
          packaging={packaging}
          src={src}
        />
      ))}
    </div>
  );
}
