import { NavLink } from "react-router";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <div>
        <NavLink className={({ isActive }) => `${isActive && style.active}`} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => `${isActive && style.active}`} to="/Profile">
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
