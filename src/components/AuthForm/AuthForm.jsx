import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import style from "./AuthForm.module.css";
import { Link } from "react-router";
import { useAlerts } from "../../store/alerts-context";

const AuthForm = ({ type }) => {
  const [firstInputType, setFirstInputType] = useState("password");
  const [secondInputType, setSecondInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleLogin, handleRegister } = useAuth();
  const { handleAlert } = useAlerts();

  const handleInputType = (inputType, setInputType) => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleAuth = () => {
    if (type === "login") {
      handleLogin(email, password);
    } else {
      if (password !== confirmPassword) {
        handleAlert("Passwords do not match!", true);
        return;
      }

      handleRegister(email, password);
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
            <input type={firstInputType} id="password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
            <button
              type="button"
              onClick={() => {
                handleInputType(firstInputType, setFirstInputType);
              }}
            >
              {firstInputType === "password" ? "show" : "hide"}
            </button>
          </div>
        </div>
        {type === "register" && (
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className={style.password}>
              <input type={secondInputType} id="confirm-password" value={confirmPassword} onChange={(ev) => setConfirmPassword(ev.target.value)} />
              <button
                type="button"
                onClick={() => {
                  handleInputType(secondInputType, setSecondInputType);
                }}
              >
                {secondInputType === "password" ? "show" : "hide"}
              </button>
            </div>
          </div>
        )}
        <div>
          {type === "login" ? (
            <div>
              Don't have an account? <Link to="/register"> Register</Link>
            </div>
          ) : (
            <div></div>
          )}
          <button
            type="button"
            disabled={email.length === 0 || password.length === 0 || (type === "register" && confirmPassword.length === 0)}
            onClick={handleAuth}
          >
            {type === "login" ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
