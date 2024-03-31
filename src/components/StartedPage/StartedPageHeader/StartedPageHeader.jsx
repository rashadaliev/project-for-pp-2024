import React from "react";
import styles from "./StartedPageHeader.module.css";
import { Link } from "react-router-dom";
const StartedPageHeader = () => {
  return (
    <div className={`${styles.flex} ${styles["header-container"]}`}>
      <a href="#" className={styles.link}>
        konstruct
      </a>
      <div className={styles["authentication"]}>
        <Link to={`/registration`} className={styles.link}>
          Регистрация
        </Link>
        <Link to={`/login`} className={styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default StartedPageHeader;
