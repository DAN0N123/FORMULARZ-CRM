/* eslint-disable react/prop-types */
import { Pencil } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Product({ uniqueId, name, src, initPrice, packaging }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const inputRef = useRef();
  const [price, setPrice] = useState(initPrice);

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  function handleEditSubmit(e) {
    e.preventDefault();
    setIsEditMode(false);
  }
  return (
    <div
      key={uniqueId}
      className="relative flex flex-col gap-2 items-center justify-end min-h-[250px] border-2 border-[#f4976c90] p-2 bg-white rounded-md"
    >
      <div
        className="border-[2px] border-black rounded-lg p-1 absolute bottom-[0.5rem] right-[0.5rem] hover:bg-[#00000010]"
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        <Pencil width={'20px'} height={'auto'} />
      </div>
      {src != null && (
        <img src={src} className="h-[150px] w-auto object-cover" />
      )}
      <p className="text-xl font-bold text-center">{name}</p>
      {isEditMode ? (
        <form className="text-lg flex gap-1" onSubmit={handleEditSubmit}>
          <div className="relative flex">
            <input
              ref={inputRef}
              type="number"
              className="w-[5rem]"
              value={price}
              step="0.1"
              onChange={(e) => {
                let value = e.target.value;

                if (value.includes('.')) {
                  const [integerPart, decimalPart] = value.split('.');
                  if (decimalPart.length > 2) {
                    value = `${integerPart}.${decimalPart.slice(0, 2)}`;
                  }
                } else {
                  if (value.length > 3) {
                    value = value.slice(0, 3);
                  }
                }

                setPrice(value);
              }}
            />
            <p className="absolute right-[0.25rem]">PLN</p>
          </div>

          <p> /</p>
          <p> {packaging} </p>
        </form>
      ) : (
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
      )}
    </div>
  );
}
