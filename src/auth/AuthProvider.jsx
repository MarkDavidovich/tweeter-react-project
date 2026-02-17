import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import { useAlerts } from "../store/alerts-context";

const AuthContext = createContext(null);

export function AuthProvider({ onAuthReady, children }) {
  const [loggedOnUser, setLoggedOnUser] = useState(null);

  const navigate = useNavigate();
  const { handleAlert } = useAlerts();

  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setLoggedOnUser(data.user);
      } catch (err) {
        handleAlert(`Error: ${err.message}`, true);
      } finally {
        onAuthReady();
      }
    };

    fetchActiveUser();
  }, []);

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
      handleAlert(`Logged in: ${data.user.email}`);
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
      handleAlert(`Logged out successfully!`);
    } catch (err) {
      handleAlert(`Failed to log out! ${err.message}`, true);
    }
  };

  const handleUserNameChange = async (newUserName) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          display_name: newUserName,
        },
      });

      if (error) {
        handleAlert(`Could not change user name! ${error}`);
        return;
      }
      setLoggedOnUser(data.user);
      handleAlert(`User display name changed!`);
    } catch (err) {
      handleAlert(`Error: ${err.message}`, true);
    }
  };

  const userCtx = {
    loggedOnUser,
    handleLogin,
    handleLogout,
    handleUserNameChange,
  };

  return <AuthContext value={userCtx}>{children}</AuthContext>;
}

export function useAuth() {
  return useContext(AuthContext);
}
