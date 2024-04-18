import React from "react";
import styles from "../TemplateSelection/TemplateSelection.module.css";
import image from "../../assets/templateimg.png";
const TemplateSelection = () => {
  return (
    <div className={styles["container-templateSelection"]}>
      <h1 className={styles["templateSelection__title"]}>
        Выберите макет страницы
      </h1>
      <div className={styles["templates"]}>
        <div className={styles.template}>
          <img className={styles["template-image"]} src={image} alt="" />
          <div className={styles["template__footer"]}>
            <p className={styles["template__footer-text"]}>Магазин</p>
            <p
              className={`${styles["template__footer-text"]} ${styles["text-bold"]}`}
            >
              "Black Rap"
            </p>
          </div>
        </div>
        <div className={styles.template}>
          <img src={image} alt="" className={styles["template-image"]} />
          <div className={styles["template__footer"]}>
            <p className={styles["template__footer-text"]}>Магазин</p>
            <p
              className={`${styles["template__footer-text"]} ${styles["text-bold"]}`}
            >
              "Black Rap"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
