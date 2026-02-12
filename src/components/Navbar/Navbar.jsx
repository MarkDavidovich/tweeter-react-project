import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <ul>
        <li>Home</li>
        <li>User</li>
      </ul>
    </nav>
  );
};
export default Navbar;
