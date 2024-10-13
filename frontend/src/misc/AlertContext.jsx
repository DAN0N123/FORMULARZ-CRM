/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  function addAlert(type, message) {
    const id = crypto.randomUUID();
    const newAlert = { type, message, id };
    setAlerts([...alerts, newAlert]);
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  }

  useEffect(() => {
    console.log(alerts);
  }, [alerts]);

  function removeAlert(id) {
    const filteredAlerts = alerts.filter((alert) => alert.id != id);
    setAlerts(filteredAlerts);
  }

  function clearAlerts() {
    setAlerts([]);
  }
  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, clearAlerts, removeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

// { type: 'success', message: 'Pomyślnie dodano nowe zamówienie', id: '12' },
//     {
//       type: 'error',
//       message: 'Wystąpił problem przy dodawaniu zamówienia',
//       id: '14',
//     },
//     { type: 'info', message: 'Pomyślnie dodano nowe zamówienie', id: '11' },
//     {
//       type: 'warning',
//       message: 'Wystąpił problem przy dodawaniu zamówienia',
//       id: '15',
//     },
