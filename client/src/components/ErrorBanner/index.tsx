import { FC } from "react";
import { ErrorBannerProps } from "./types";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import styles from "./styles.module.scss";

export const ErrorBanner: FC<ErrorBannerProps> = ({
  text,
  isOpened,
  close,
}) => {
  if (!isOpened) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <MdOutlineReportGmailerrorred size={30} color="white" />
        <span>{text}</span>
      </div>
      <button className={styles.closeButton} type="button" onClick={close}>
        <IoMdClose size={20} />
      </button>
    </div>
  );
};
