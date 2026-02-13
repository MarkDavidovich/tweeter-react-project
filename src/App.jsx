import { Routes, Route } from "react-router";
import style from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import { useEffect, useState, useRef } from "react";
import { saveToLocalStorage, loadFromLocalStorage } from "./lib/storage";
import Popup from "./components/Popup/Popup";

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
    }, 2000);

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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tweets userName={userName} onAlert={handleAlert} />} />
        <Route path="/Profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
      </Routes>
      {alert && <Popup message={alert.message} isError={alert.isError} />}
    </>
  );
}

export default App;
