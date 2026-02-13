import { Routes, Route } from "react-router";
import style from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("fullstack_mark");

  const handleUserNameChange = (newUserName) => {
    setUserName(newUserName);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tweets userName={userName} />} />
        <Route path="/Profile" element={<Profile userName={userName} onUserNameChange={handleUserNameChange} />} />
      </Routes>
    </>
  );
}

export default App;
