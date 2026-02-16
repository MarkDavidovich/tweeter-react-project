import { Routes, Route } from "react-router";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import { loadFromLocalStorage } from "./lib/storage";
import Login from "./pages/Login/Login";
import AuthProvider from "./auth/AuthProvider";
import { AlertsProvider } from "./store/alerts-context";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(loadFromLocalStorage() || "fullstack_mark");

  const handleUserNameChange = (newUserName) => {
    setUserName(newUserName);
  };

  return (
    <>
      <AlertsProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Tweets userName={userName} />} />
            <Route path="/profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Tweets userName={userName} />} />
          </Routes>
        </AuthProvider>
      </AlertsProvider>
    </>
  );
}

export default App;
