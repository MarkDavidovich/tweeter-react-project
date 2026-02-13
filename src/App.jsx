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
  const [popupContext, setPopupContext] = useState(null);

  const timeoutRef = useRef(null);

  useEffect(() => {
    saveToLocalStorage(userName);
  }, [userName]);

  useEffect(() => {
    if (!popupContext) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setPopupContext(null);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [popupContext]);

  const handleUserNameChange = (newUserName) => {
    setPopupContext({ message: `Username changed successfuly!`, isError: false });
    setUserName(newUserName);
  };

  const handleTweetPopups = (message, isError) => {
    setPopupContext({ message, isError });
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tweets userName={userName} onTweetPopups={handleTweetPopups} />} />
        <Route path="/Profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
      </Routes>
      <Popup message={popupContext?.message} isError={popupContext?.isError} />
    </>
  );
}

export default App;
