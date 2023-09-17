import React from "react";
import styles from "./Backdrop.module.css";

const Backdrop = ({ show, onClick }) => {
  const backdropClassNames = [
    styles.backdrop,
    show ? styles["backdrop-entered"] : styles["backdrop-exited"],
  ].join(" ");

  return <div className={backdropClassNames} onClick={onClick}></div>;
};

export default Backdrop;
