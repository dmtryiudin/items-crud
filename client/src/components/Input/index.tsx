import { forwardRef } from "react";
import { InputProps } from "./types";
import styles from "./styles.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, ...rest }, ref) => {
    const inputStyles = [styles.input, error ? styles.inputError : null]
      .filter((el) => !!el)
      .join(" ");

    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>{label}</label>
        <input {...rest} ref={ref} className={inputStyles} />
        {error ? <label className={styles.errorText}>{error}</label> : null}
      </div>
    );
  }
);

Input.displayName = "Input";
