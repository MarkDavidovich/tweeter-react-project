import { createContext, useContext, useEffect, useRef, useState } from "react";
import Popup from "../components/Popup/Popup";

const AlertsContext = createContext({ alert: { message: null, isError: false }, handleAlert: () => {} });

export const AlertsProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const timeoutRef = useRef(null);

  const handleAlert = (message, isError = false) => {
    setAlert({ message, isError });
  };

  useEffect(() => {
    if (!alert) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setAlert(null);
    }, 2500);

    return () => clearTimeout(timeoutRef.current);
  }, [alert]);

  return (
    <AlertsContext value={{ alert, handleAlert }}>
      {children}
      {alert && <Popup />}
    </AlertsContext>
  );
};

export const useAlerts = () => useContext(AlertsContext);
