import style from "./Login.module.css";

const Login = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id={style.email} placeholder="your_email@mail.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id={style.password} />
        </div>
        <div>
          <div>Message</div>
          <button type="button">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
