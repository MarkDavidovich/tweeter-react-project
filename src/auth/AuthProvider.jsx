import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loadFromLocalStorage, saveToLocalStorage } from "../lib/storage";
import { supabase } from "../lib/supabase";
import { AlertsContext } from "../store/alerts-context";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [loggedOnUser, setLoggedOnUser] = useState(loadFromLocalStorage() || null);

  const navigate = useNavigate();
  const { handleAlert } = useContext(AlertsContext);

  useEffect(() => {
    saveToLocalStorage(loggedOnUser);
  }, [loggedOnUser]);

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        handleAlert(`Failed to login! ${error.message}`, true);
        return;
      }

      setLoggedOnUser(data.user);
      handleAlert(`Logged in: ${data.user.email}`, false);
      console.log(`logged in: ${data.user.email}`);
      navigate("/");
    } catch (err) {
      handleAlert(`Error: ${err.message}`, true);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setLoggedOnUser(null);
      navigate("/login");
      handleAlert({ message: `Logged out successfully!`, isError: false });
      console.log(`successfully logged out!`);
    } catch (err) {
      handleAlert({ message: `Failed to log out! ${err.message}`, isError: true });
    }
  };

  const userCtx = {
    loggedOnUser,
    handleLogin,
    handleLogout,
  };

  return <AuthContext value={userCtx}>{children}</AuthContext>;
}

export function useAuth() {
  return useContext(AuthContext);
}
