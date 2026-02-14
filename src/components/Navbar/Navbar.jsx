import { NavLink } from "react-router";
import navItems from "./../../lib/navItems";
import style from "./Navbar.module.css";

const Navbar = ({ onLogOut, loggedOnUser }) => {
  return (
    <nav className={style.container}>
      <div>
        {loggedOnUser &&
          navItems.map((navItem) => (
            <NavLink key={navItem.name} className={({ isActive }) => `${isActive && style.active}`} to={navItem.param}>
              {navItem.name}
            </NavLink>
          ))}
        {loggedOnUser ? (
          <button onClick={onLogOut}>Logout</button>
        ) : (
          <NavLink className={({ isActive }) => `${isActive && style.active}`} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
