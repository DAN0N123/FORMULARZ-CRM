// import { useState } from "react"
import { AlignJustify, CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Carrot } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }

    return () => {
      document.body.style.overflowY = '';
    };
  }, [open]);

  return (
    <div
      className={`w-full h-[3.5rem] flex justify-start items-center p-4 border-b-[1px] border-[#303c6c50]`}
    >
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        <AlignJustify color="#303c6c" width="2rem" height="2rem" />
      </button>
      <div
        className={`flex h-full flex-col items-start pl-4 pt-16 gap-[2.5rem] ${open ? 'translate-x-[0]' : 'translate-x-[-100%]'} absolute left-0 top-0 w-[80%] pr-4 bg-[#f9f9f9] transition-transform duration-200 z-[9999]`}
      >
        <button
          className="absolute top-[1rem] left-[1rem]"
          onClick={() => {
            setOpen(false);
          }}
        >
          <ArrowLeft color="#303c6c" width="2rem" height="2rem" />
        </button>
        <Link
          to="/produkty"
          onClick={() => {
            setOpen(false);
          }}
          className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:bottom-0 before:bg-darkBlue'
        >
          <Carrot color="#303c6c" width="2rem" height="2rem" />
          <p> Produkty </p>
        </Link>
        <Link
          to="/klienci"
          onClick={() => {
            setOpen(false);
          }}
          className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:bottom-0 before:bg-darkBlue'
        >
          <UsersRound color="#303c6c" width="2rem" height="2rem" />
          <p> Klienci </p>
        </Link>
        <div
          onClick={() => {
            setOpen(false);
          }}
          className='relative w-[16rem] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:left-[-0.125rem] before:bottom-0 before:bg-darkBlue'
        >
          <BookOpen color="#303c6c" width="2rem" height="2rem" />
          <p> Zamówienia </p>
        </div>
        <Link
          to="/formularz"
          onClick={() => {
            setOpen(false);
          }}
          className='relative w-[fit] p-4 flex gap-[1.5rem] hover:bg-[#303c6c10] rounded-t-xl items-center text-xl before:absolute before:content-[""] before:h-[0.125rem] before:left-0 before:w-full before:left-[-0.125rem] before:bottom-0 before:bg-darkBlue'
        >
          <CirclePlus color="#303c6c" width="2rem" height="2rem" />
          <p> Dodaj zamówienie </p>
        </Link>
      </div>
    </div>
  );
}
