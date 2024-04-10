import React from "react";
import styles from "./StartedPageHeader.module.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/k-small.png";
const StartedPageHeader = () => {
  return (
    <div className={`${styles.flex} ${styles["header-container"]}`}>
      <div className={styles["logo-container"]}>
        <div className={styles.square}></div>
        <a href="#">
          <img src={logo} alt="" />
        </a>
      </div>

      <div className={styles["authentication"]}>
        <Link to={`/login`} className={styles.link}>
          Войти
        </Link>
        <Link
          to={`/registration`}
          className={`${styles["link"]} ${styles["link-reg"]}`}
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};

export default StartedPageHeader;
