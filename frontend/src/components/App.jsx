/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from './Layout';
import Products from './Products';
import Clients from './Clients';
import OrderForm from './OrderForm';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/produkty',
        element: <Products />,
      },
      {
        path: '/klienci',
        element: <Clients />,
      },
      {
        path: '/formularz',
        element: <OrderForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
