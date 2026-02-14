import { NavLink } from "react-router";
import navItems from "./../../lib/navItems";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <div>
        {navItems.map((navItem) => (
          <NavLink className={({ isActive }) => `${isActive && style.active}`} to={navItem.param}>
            {navItem.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
