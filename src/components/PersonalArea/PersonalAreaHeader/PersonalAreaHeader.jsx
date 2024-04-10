import React from "react";
import styles from "../PersonalAreaHeader/PersonalAreaHeader.module.css";
import logo from "../../../assets/k-small.png";
import { Link } from "react-router-dom";
const PersonalAreaHeader = (props) => {
  const { name } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["left-half"]}>
        <div className={styles.square}></div>
        <Link className={styles["logo-link"]}>
          <img src={logo} alt="" className={styles["logo"]} />
        </Link>
        <div className={styles["left-menu"]}>
          <div className={styles["my-site"]}>Мой сайт</div>
          <div className={styles["crm"]}>CRM</div>
        </div>
      </div>
      <div className={styles["right-half"]}>
        <Link>{name}</Link>
      </div>
    </div>
  );
};

export default PersonalAreaHeader;
