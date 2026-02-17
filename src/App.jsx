import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import Tweets from "./pages/Tweets/Tweets";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./auth/AuthProvider";
import { AlertsProvider } from "./store/alerts-context";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useState } from "react";
import "./App.css";

function App() {
  const [authReady, setAuthReady] = useState(null);

  return (
    <>
      <AlertsProvider>
        <AuthProvider
          onAuthReady={() => {
            setAuthReady(true);
          }}
        >
          <Navbar />
          {authReady && (
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Tweets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </AuthProvider>
      </AlertsProvider>
    </>
  );
}

export default App;
