import React from "react";
import styles from "./Heading.module.css";
import cn from "classnames";
import { HeadingProps } from "./Heading.props";

const Heading = ({ className, children, ...props }: HeadingProps) => {
  return (
    <h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
  );
};

export default Heading;
