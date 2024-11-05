import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import "../../assets/reset.scss";
import "../../assets/fonts.scss";
import styles from "./styles.module.scss";

export const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};
