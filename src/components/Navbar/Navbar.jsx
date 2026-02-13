import style from "./Navbar.module.css";

const Navbar = ({ children }) => {
  return (
    <nav className={style.container}>
      <div>{children}</div>
    </nav>
  );
};
export default Navbar;
