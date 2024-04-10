import React from "react";
import styles from "./StartedPageBody.module.css";
const StartedPageBody = () => {
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles["container-center"]}>
        <div className={styles["main-info"]}>
          <p></p>
          <button>Попробовать</button>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default StartedPageBody;
