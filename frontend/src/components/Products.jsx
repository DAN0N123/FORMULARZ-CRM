/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { CirclePlus, X } from 'lucide-react';
import Product from './Product';
import useSWR from 'swr';
import DropdownMenu from './DropdownMenu';
import ImageInput from './ImageInput';
import fetcher from '../helpers/fetcher';
export default function Products() {
  const { data, error, isLoading } = useSWR(
    'http://127.0.0.1:3000/products/get',
    fetcher
  );

  const [products, setProducts] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('kg');
  const [file, setFile] = useState(null);
  function handleFormSubmit(e) {
    e.preventDefault();
    const name = document.querySelector('#productName').value;
    const price = document.querySelector('#price').value;
    const image = file;
    const packaging = selectedOption;
    setFormActive(false);
  }
  useEffect(() => {
    if (data != undefined) {
      setProducts(data);
    }
  }, [data]);
  if (isLoading) return;
  return (
    <div className="w-full box-border grid grid-cols-1 gap-4 p-4 no-scrollbar overflow-y-auto">
      {formActive ? (
        <form
          className="w-full flex justify-center fadeIn"
          onSubmit={handleFormSubmit}
        >
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
                className="p-1 rounded-lg focus:outline-none border-[2px] border-slate"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price"> Cena: </label>
              <input
                type="number"
                required
                id="price"
                className="p-1 rounded-lg focus:outline-none border-[2px] border-slate"
              />
            </div>
            <div className="flex flex-col gap-1">
              <ImageInput
                label={'Zdjęcie (opcjonalnie): '}
                file={file}
                setFile={setFile}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="dropdownMenu"> Sposób pakowania: </label>
              <DropdownMenu
                options={[
                  'sztuki',
                  'kg',
                  'wiązki',
                  'główka',
                  'słoik 0.9l',
                  'butelka 0.5l',
                  'butelka 1l',
                  'paczka',
                  'porcja',
                  'pęczek',
                ]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>
            <button className="border-[1px] rounded-full bg-[#00000020] p-2 active:scale-[101%]">
              {' '}
              Dodaj{' '}
            </button>
          </div>
        </form>
      ) : (
        <button
          className="flex w-full items-center justify-center gap-4 bg-[#f28a72] p-3 shadow-md rounded-full"
          onClick={() => {
            setFormActive(true);
          }}
        >
          <CirclePlus color="#303c6c" width={'2rem'} height={'auto'} />
          <p className="text-xl">Dodaj produkt</p>
        </button>
      )}
      {products.map(({ _id, name, price, packaging, image }) => (
        <Product
          key={_id}
          uniqueId={_id}
          name={name}
          initPrice={price}
          packaging={packaging}
          src={image}
        />
      ))}
    </div>
  );
}
