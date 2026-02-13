import { NavLink, Routes, Route } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <div>
        <Navbar>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Profile">Profile</NavLink>
        </Navbar>
        <Routes>
          <Route path="/" element={<Tweets />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
