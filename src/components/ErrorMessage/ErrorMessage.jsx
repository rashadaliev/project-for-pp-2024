import React from "react";
import styles from "../ErrorMessage/ErrorMessage.module.css";
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className={styles["error-message"]}>
      <p className={styles["error-text"]}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
