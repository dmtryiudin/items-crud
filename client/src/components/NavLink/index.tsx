import { FC } from "react";
import styles from "./styles.module.scss";
import { Link, LinkProps } from "react-router-dom";

export const NavLink: FC<LinkProps & { variant?: "primary" | "white" }> = ({
  variant = "primary",
  ...rest
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return styles.linkPrimary;
      case "white":
        return styles.linkWhite;
    }
  };

  return <Link {...rest} className={getVariantClass()}></Link>;
};
