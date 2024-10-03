/* eslint-disable react/prop-types */
import fetcher from '../helpers/fetcher';
import useSWR from 'swr';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function ClientsModal({ setClientModal }) {
  const { data } = useSWR('http://127.0.0.1:3000/clients/get', fetcher);
  const [value, setValue] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="absolute flex inset-0 justify-center pt-[30%] w-screen h-screen">
      <div className="fixed w-[9999px] h-[9999px] top-0 left-0 backdrop-blur-sm z-[9998]"></div>
      <form
        className="relative w-[80vw] h-[50vh] bg-white shadow-xl border-[1px] border-darkcoral rounded-lg z-[9999]  pt-8 flex flex-col gap-4 overflow-auto"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => {
            setClientModal(false);
          }}
        >
          <X />
        </button>
        <div className="p-4 flex flex-col gap-4 w-full">
          <div className="radio-input">
            {data
              ? data.map((client) => (
                  <label className="label" key={client._id}>
                    <input
                      type="radio"
                      onChange={(e) => {
                        setValue(client._id);
                      }}
                      id={client._id}
                      checked={client._id === value}
                      name={client.address}
                      value={client}
                    />
                    <p className="text">{client.address}</p>
                  </label>
                ))
              : null}
          </div>
        </div>
        <div className="w-full">
          <button className="w-full flex justify-center items-center h-[50px] bg-[#f28a7280]">
            Zatwierdź
          </button>
        </div>
      </form>
    </div>
  );
}
