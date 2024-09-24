import { defaultClients } from '../constants';
import { CircleUserRound, Trash } from 'lucide-react';
export default function Clients() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {defaultClients.map(({ address, phone }, index) => (
        <div
          key={index}
          className="rounded-lg bg-white justify-start p-4 flex items-center gap-4"
        >
          <CircleUserRound color="#f4976c" />
          <p className="relative w-full">
            <p>{address}</p>
            <p>tel: {phone}</p>
          </p>
          <Trash color="#F53939" width={'30px'} height={'auto'} />
        </div>
      ))}
    </div>
  );
}
