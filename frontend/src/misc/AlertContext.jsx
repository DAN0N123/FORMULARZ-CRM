/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    { type: 'success', message: 'Pomyślnie dodano nowe zamówienie', id: '12' },
    {
      type: 'error',
      message: 'Wystąpił problem przy dodawaniu zamówienia',
      id: '14',
    },
    { type: 'info', message: 'Pomyślnie dodano nowe zamówienie', id: '11' },
    {
      type: 'warning',
      message: 'Wystąpił problem przy dodawaniu zamówienia',
      id: '15',
    },
  ]);

  function addAlert(type, message) {
    const id = crypto.randomUUID();
    const newAlert = { type, message, id };
    setAlerts([...alerts, newAlert]);
  }

  function clearAlerts() {
    setAlerts([]);
  }
  return (
    <AlertContext.Provider value={{ alerts, addAlert, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};
