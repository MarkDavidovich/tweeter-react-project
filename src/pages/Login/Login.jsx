import { useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import style from "./Login.module.css";

const Login = () => {
  return (
    <>
      <AuthForm type={"login"} />
    </>
  );
};

export default Login;
