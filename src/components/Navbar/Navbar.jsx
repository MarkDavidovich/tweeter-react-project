import { NavLink } from "react-router";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <div>
        <NavLink className={({ isActive }) => `${isActive && style.active}`} to="/tweeter-react-project/">
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
