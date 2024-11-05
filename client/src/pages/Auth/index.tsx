import { Outlet, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect } from "react";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth/login");
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
