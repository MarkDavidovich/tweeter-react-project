import style from "./Login.module.css";

const Login = () => {
  return (
    <form className={style.container}>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="your_email@mail.com" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className={style.password}>
            <input type="password" id="password" />
            <button type="button">show</button>
            {/* on click change type of password input to text */}
          </div>
        </div>
        <div>
          <div>{/*message*/}</div>
          <button type="button">Login</button>
        </div>
      </div>
    </form>
  );
};
export default Login;
