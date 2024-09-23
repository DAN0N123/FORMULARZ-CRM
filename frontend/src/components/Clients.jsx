import { defaultClients } from '../constants';
import { CircleUserRound } from 'lucide-react';
export default function Clients() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {defaultClients.map(({ address, phone }, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-4 flex items-center gap-4"
        >
          <CircleUserRound color="#f4976c" />
          <p className="flex flex-col gap-1 justify-center">
            <p>{address}</p>
            <p>tel: {phone}</p>
          </p>
        </div>
      ))}
    </div>
  );
}
