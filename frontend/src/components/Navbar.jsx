// import { useState } from "react"
import { AlignJustify } from 'lucide-react';
import { useState } from 'react';
import { Carrot } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-[3.5rem] bg-[#00000030] flex justify-start items-center p-4">
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <AlignJustify color="#303c6c" width="2rem" height="2rem" />
      </button>
      {open ? (
        <div className="flex flex-col items-start pl-4 pt-16 gap-[2.5rem] absolute left-0 top-0 h-screen w-[80%] bg-[#f9f9f9]">
          <button
            className="absolute top-[1rem] left-[1rem]"
            onClick={() => {
              setOpen(false);
            }}
          >
            <ArrowLeft color="#303c6c" width="2rem" height="2rem" />
          </button>
          <Link
            to="/warzywa"
            className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:bottom-0 before:bg-darkBlue'
          >
            <Carrot color="#303c6c" width="2rem" height="2rem" />
            <p> Warzywa </p>
          </Link>
          <div className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:bottom-0 before:bg-darkBlue'>
            <UsersRound color="#303c6c" width="2rem" height="2rem" />
            <p> Klienci </p>
          </div>
          <div className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:left-[-0.125rem] before:bottom-0 before:bg-darkBlue'>
            <BookOpen color="#303c6c" width="2rem" height="2rem" />
            <p> Zamówienia </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
