import { useState } from "react";
import { supabase } from "../../lib/supabase";
import style from "./Login.module.css";
import { useNavigate } from "react-router";

const Login = ({ onAlert, onLoggedOnUser }) => {
  const [inputType, setInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        onAlert(`Failed to login! ${error.message}`, true);
        return;
      }

      onLoggedOnUser(data.user);
      onAlert(`Logged in: ${data.user.email}`, false);
      navigate("/");
    } catch (err) {
      onAlert(`Error: ${err.message}`, true);
    }
  };

  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <form className={style.container}>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="your_email@mail.com" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className={style.password}>
            <input type={inputType} id="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
            <button type="button" onClick={handleInputType}>
              {inputType === "password" ? "show" : "hide"}
            </button>
          </div>
        </div>
        <div>
          <button type="button" disabled={email.length === 0 || password.length === 0} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
