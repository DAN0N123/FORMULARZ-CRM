import { useEffect, useState } from 'react';
import { CircleUserRound, Trash, CirclePlus, X } from 'lucide-react';
import PhoneNumberInput from './PhoneNumberInput';
import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
export default function Clients() {
  const { data } = useSWR('http://127.0.0.1:3000/clients/get', fetcher);
  const [clients, setClients] = useState([]);
  const [formActive, setFormActive] = useState(false);
  async function removeClient(client) {
    try {
      await fetcher(
        `http://127.0.0.1:3000/clients/delete/${client._id}`,
        'POST'
      );
    } catch (err) {
      return;
    }

    const newClients = clients.filter(
      (currentClient) => currentClient.address != client.address
    );
    setClients(newClients);
  }
  useEffect(() => {
    if (data != undefined) {
      setClients(data);
    }
  }, [data]);
  async function handleSubmit(e) {
    e.preventDefault();
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;
    try {
      await fetcher('http://127.0.0.1:3000/clients/add', 'POST', {
        address,
        phone,
      });
    } catch (err) {
      return err;
    }

    const newClients = [{ address, phone }, ...clients];
    setClients(newClients);
    setFormActive(false);
  }
  return (
    <div className="flex flex-col gap-4 p-6">
      <form
        className="self-center mb-4 w-full flex justify-center"
        onSubmit={handleSubmit}
      >
        {formActive ? (
          <div className="w-full  flex justify-center fadeIn">
            <div className="relative w-[80%] flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg">
              <button
                className="absolute top-[0.5rem] right-[0.5rem]"
                onClick={() => {
                  setFormActive(false);
                }}
              >
                <X color="#00000070" width={'1.5rem'} height={'100%'} />
              </button>
              <div className="flex flex-col gap-1">
                <label htmlFor="address"> Adres: </label>
                <input
                  type="text"
                  required
                  id="address"
                  className="p-1 rounded-lg focus:outline-none border-[1px] border-[#CCCCCC]"
                />
              </div>
              <PhoneNumberInput />
              <button className="border-[1px] rounded-full bg-[#00000020] p-2 active:scale-[101%]">
                {' '}
                Dodaj{' '}
              </button>
            </div>
          </div>
        ) : (
          <button
            className="flex w-full items-center justify-center gap-4 bg-coral p-3 shadow-md rounded-full"
            onClick={() => {
              setFormActive(true);
            }}
          >
            <CirclePlus color="#303c6c" width={'2rem'} height={'100%'} />
            <p className="text-xl">Dodaj stałego klienta</p>
          </button>
        )}
      </form>
      {clients.map((client) => (
        <div
          key={Math.random()}
          className="rounded-lg bg-white justify-start p-4 flex items-center gap-4"
        >
          <CircleUserRound color="#f4976c" width={'2rem'} height={'100%'} />
          <p className="relative w-full">
            <p>{client.address}</p>
            <p>tel: {client.phone}</p>
          </p>
          <button
            onClick={() => {
              removeClient(client);
            }}
          >
            <Trash color="#F53939" width={'30px'} height={'100%'} />
          </button>
        </div>
      ))}
    </div>
  );
}
