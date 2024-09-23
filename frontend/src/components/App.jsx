/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from './Layout';
import Vegetables from './Vegetables';
import Clients from './Clients';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/warzywa',
        element: <Vegetables />,
      },
      {
        path: '/klienci',
        element: <Clients />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
