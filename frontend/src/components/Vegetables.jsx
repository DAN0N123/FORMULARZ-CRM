import { useState } from 'react';
import defaultProducts from '../constants';
export default function Vegetables() {
  const [vegetables, setVegetables] = useState(defaultProducts);
  return (
    <div className="w-full box-border grid grid-cols-1 gap-4 p-4 no-scrollbar overflow-y-auto">
      {vegetables.map(({ id, name, price, packaging }) => (
        <div
          key={id}
          className="flex flex-col gap-2 items-center justify-end min-h-[150px] border-2 border-orange p-2"
        >
          <p className="text-md font-bold text-center">{name}</p>
          <p className="text-md">
            {price < 1 ? (
              <p>
                {price * 100} groszy / {packaging}
              </p>
            ) : (
              <p>
                {price} PLN / {packaging}
              </p>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
