/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Product from './Product';
import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
import NewProductForm from './NewProductForm';
export default function Products() {
  const { data, error, isLoading } = useSWR(
    'http://127.0.0.1:3000/products/get',
    fetcher
  );

  const [products, setProducts] = useState([]);
  const [formActive, setFormActive] = useState(false);

  function handleAddProduct(name, price, image, packaging, seasonal) {
    setFormActive(false);
    const body = { name, price, image, packaging, seasonal };

    try {
      fetcher('http://127.0.0.1:3000/products/add', 'POST', body);
    } catch (err) {
      console.log(err);
    }
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
        <NewProductForm handleAddProduct={handleAddProduct} />
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
      {products.map(({ _id, name, price, packagingMethod, image }) => (
        <Product
          key={_id}
          uniqueId={_id}
          name={name}
          initPrice={price}
          packaging={packagingMethod}
          src={image}
        />
      ))}
    </div>
  );
}
