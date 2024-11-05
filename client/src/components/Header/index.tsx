import { FaOpencart } from "react-icons/fa6";
import styles from "./styles.module.scss";
import { NavLink } from "../NavLink";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <header className={styles.wrapper}>
      <Link to="/">
        <FaOpencart color="white" size={40} />
      </Link>
      {isLoggedIn ? (
        <NavLink variant="white" to="/auth/logout">
          Logout
        </NavLink>
      ) : (
        <NavLink variant="white" to="/auth/login">
          Login
        </NavLink>
      )}
    </header>
  );
};
