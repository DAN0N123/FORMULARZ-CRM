import useSWR from 'swr';
import fetcher from '../helpers/fetcher';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Trash2 } from 'lucide-react';

// coral: '#f28a72',
// slate: '#6b7a8f',

export default function Orders() {
  const { data, isLoading, error } = useSWR(
    'http://127.0.0.1:3000/orders/get',
    fetcher
  );
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (data) {
      const sortedOrders = data.sort((a, b) => b.orderNumber - a.orderNumber);
      setOrders(sortedOrders);
    }
  }, [data]);
  if (isLoading) return <div> Loading... </div>;
  return (
    <div className="flex flex-col gap-4 p-8">
      {orders.map(({ _id, address, phone, products, orderNumber }) => (
        <div
          key={_id}
          className="w-full h-fit bg-white rounded-lg shadow-xl flex flex-col gap-4 items-start p-4"
        >
          <p className="self-center text-xl">
            {' '}
            Zamówienie numer {orderNumber}{' '}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <MapPin color="#f28a72" />
              <p>{address} </p>
            </div>
            <div className="flex gap-2 items-center">
              <Phone color="#f28a72" />
              <p>{phone} </p>
            </div>
          </div>
          <div className="bg-[#E74D4D] rounded-full p-2 self-end">
            <Trash2 color="white" width={'20px'} height={'auto'} />
          </div>
        </div>
      ))}
    </div>
  );
}
