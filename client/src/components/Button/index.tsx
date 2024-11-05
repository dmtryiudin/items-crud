import { FC } from "react";
import { ButtonProps } from "./types";
import styles from "./styles.module.scss";
import { ClipLoader } from "react-spinners";

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  children,
  ...rest
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.primary, isLoading ? null : styles.primaryEnabled]
          .filter((el) => !!el)
          .join(" ");
      case "secondary":
        return [styles.secondary, isLoading ? null : styles.secondaryEnabled]
          .filter((el) => !!el)
          .join(" ");
      case "danger":
        return [styles.danger, isLoading ? null : styles.dangerEnabled]
          .filter((el) => !!el)
          .join(" ");
    }
  };

  const getSpinnerColor = () => {
    switch (variant) {
      case "primary":
        return "white";
      case "secondary":
        return "#0891b2";
      case "danger":
        return "#dc2626";
    }
  };

  return (
    <button {...rest} className={getVariantStyle()} disabled={isLoading}>
      <div
        className={styles.content}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        {children}
      </div>
      <div className={styles.loaderWrapper}>
        {isLoading ? (
          <ClipLoader
            color={getSpinnerColor()}
            loading
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : null}
      </div>
    </button>
  );
};
