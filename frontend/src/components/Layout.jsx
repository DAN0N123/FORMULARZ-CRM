import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
}
