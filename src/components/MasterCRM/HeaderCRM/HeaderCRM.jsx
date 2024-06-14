import React from "react";
import styles from "../HeaderCRM/HeaderCRM.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const HeaderCRM = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.active : "";
  };
  return (
    <div className={styles["CRM-header"]}>
      <p
        onClick={() => navigate("/archive")}
        className={getActiveClass("/archive")}
      >
        Архив
      </p>
      <p onClick={() => navigate("/crm")} className={getActiveClass("/crm")}>
        Заявки
      </p>
      <p
        onClick={() => navigate("/statistic")}
        className={getActiveClass("/statistic")}
      >
        Статистика
      </p>
    </div>
  );
};

export default HeaderCRM;
