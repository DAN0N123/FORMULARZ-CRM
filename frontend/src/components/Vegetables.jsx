/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { defaultProducts } from '../constants';

import Vegetable from './Vegetable';

export default function Vegetables() {
  const [vegetables, setVegetables] = useState(defaultProducts);
  return (
    <div className="w-full box-border grid grid-cols-1 gap-4 p-4 no-scrollbar overflow-y-auto">
      {vegetables.map(({ id, name, price, packaging, src }) => (
        <Vegetable
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
