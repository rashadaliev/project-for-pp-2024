import React from "react";
import styles from "./StartedPageBody.module.css";
import hero from "../../../assets/hero.png";
import { useNavigate } from "react-router-dom";
const StartedPageBody = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles["container-center"]}>
        <div className={styles["main-info"]}>
          <p className={styles["main-info__text"]}>
            Скорость и надёжность фундамент нашего сервиса
          </p>
          <button
            className={styles["main-info__button"]}
            onClick={() => navigate("/login")}
          >
            Попробовать
          </button>
        </div>
        <div>
          <img src={hero} alt="" />
        </div>
      </div>
    </div>
  );
};

export default StartedPageBody;
