import { Routes, Route } from "react-router";
import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import Popup from "./components/Popup/Popup";
import { saveToLocalStorage, loadFromLocalStorage } from "./lib/storage";
import "./App.css";
import Login from "./pages/Login/Login";
import { supabase } from "./lib/supabase";

function App() {
  const [userName, setUserName] = useState(loadFromLocalStorage() || "fullstack_mark");
  const [alert, setAlert] = useState(null);
  const [loggedOnUser, setLoggedOnUser] = useState(null);

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

  const handleLoggedOnUser = (user) => {
    setLoggedOnUser(user);
  };

  const handleLogOut = async () => {
    try {
      await supabase.auth.signOut();
      setLoggedOnUser(null);

      console.log(`logged out!`);
      setAlert({ message: `Logged out successfully!`, isError: false });
    } catch (err) {
      setAlert({ message: `Failed to log out! ${err.message}`, isError: true });
    }
  };

  const handleAlert = (message, isError) => {
    setAlert({ message, isError });
  };

  return (
    <>
      <Navbar onLogOut={handleLogOut} loggedOnUser={loggedOnUser} />
      <Routes>
        <Route path="/" element={<Tweets userName={userName} onAlert={handleAlert} />} />
        <Route path="/profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
        <Route path="/login" element={<Login onAlert={handleAlert} onLoggedOnUser={handleLoggedOnUser} />} />
      </Routes>
      {alert && <Popup message={alert.message} isError={alert.isError} />}
    </>
  );
}

export default App;
