import { Routes, Route } from "react-router";
import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import Popup from "./components/Popup/Popup";
import { saveToLocalStorage, loadFromLocalStorage } from "./lib/storage";
import Login from "./pages/Login/Login";
import AuthProvider from "./auth/AuthProvider";
import { AlertsContext } from "./store/alerts-context";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(loadFromLocalStorage() || "fullstack_mark");
  const [alert, setAlert] = useState(null);

  const timeoutRef = useRef(null);

  useEffect(() => {
    saveToLocalStorage(userName);
  }, [userName]);

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

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [alert]);

  const handleUserNameChange = (newUserName) => {
    setAlert({ message: `Username changed successfuly!`, isError: false });
    setUserName(newUserName);
  };

  const handleAlert = (message, isError) => {
    setAlert({ message, isError });
  };

  const alertCtxValue = { handleAlert };

  return (
    <>
      <AlertsContext value={alertCtxValue}>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Tweets userName={userName} />} />
            <Route path="/profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Tweets userName={userName} onAlert={handleAlert} />} />
          </Routes>
          {alert && <Popup message={alert.message} isError={alert.isError} />}
        </AuthProvider>
      </AlertsContext>
    </>
  );
}

export default App;
