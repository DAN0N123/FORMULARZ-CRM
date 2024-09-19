/* eslint-disable react/prop-types */
import { Pencil } from 'lucide-react';

export default function Vegetable({ uniqueId, name, src, price, packaging }) {
  return (
    <div
      key={uniqueId}
      className="relative flex flex-col gap-2 items-center justify-end min-h-[250px] border-2 border-orange p-2 bg-white rounded-md"
    >
      <div className="border-[2px] border-black rounded-lg p-1 absolute bottom-[0.5rem] right-[0.5rem] hover:bg-[#00000010]">
        <Pencil />
      </div>
      {src != null && (
        <img src={src} className="h-[150px] w-auto object-cover" />
      )}
      <p className="text-xl font-bold text-center">{name}</p>
      <p className="text-lg">
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
  );
}
