import React, { useState } from "react";
import styles from "../PersonalAreaModal/PersonalAreaModal.module.css";
import classNames from "classnames";
const PersonalAreaModal = (props) => {
  const { openModal, closeModal, onAddSite } = props;
  const [siteName, setSiteName] = useState("");
  const makeNewSite = () => {
    onAddSite(siteName);
    setSiteName("");
    closeModal();
  };
  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: openModal,
      })}
    >
      <div className={styles.modal}>
        <p className={styles["modal-title"]}>Создание нового сайта</p>
        <div className={styles.header}>
          <p className={styles["header-left"]}>Название</p>
          <p className={styles["header-right"]}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.875 5.625H8.125V4.375H6.875M7.5 12.5C4.74375 12.5 2.5 10.2563 2.5 7.5C2.5 4.74375 4.74375 2.5 7.5 2.5C10.2563 2.5 12.5 4.74375 12.5 7.5C12.5 10.2563 10.2563 12.5 7.5 12.5ZM7.5 1.25C6.67924 1.25 5.86651 1.41166 5.10823 1.72575C4.34994 2.03984 3.66095 2.50022 3.08058 3.08058C1.90848 4.25269 1.25 5.8424 1.25 7.5C1.25 9.1576 1.90848 10.7473 3.08058 11.9194C3.66095 12.4998 4.34994 12.9602 5.10823 13.2742C5.86651 13.5883 6.67924 13.75 7.5 13.75C9.1576 13.75 10.7473 13.0915 11.9194 11.9194C13.0915 10.7473 13.75 9.1576 13.75 7.5C13.75 6.67924 13.5883 5.86651 13.2742 5.10823C12.9602 4.34994 12.4998 3.66095 11.9194 3.08058C11.3391 2.50022 10.6501 2.03984 9.89177 1.72575C9.13349 1.41166 8.32076 1.25 7.5 1.25ZM6.875 10.625H8.125V6.875H6.875V10.625Z"
                fill="#2590CC"
              />
            </svg>
            В рамках <span className={styles.bold}>KONSTRUCT</span>
          </p>
        </div>

        <input
          className={styles["modal__input"]}
          type="text"
          placeholder="Магазин YEEZY"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />

        <div className={styles["container-button"]}>
          <button
            className={`${styles["btn-close"]} ${styles.btn}`}
            onClick={closeModal}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.3725 15.6984C14.5484 15.8743 14.7868 15.973 15.0355 15.973C15.2841 15.973 15.5226 15.8743 15.6984 15.6984C15.8742 15.5226 15.973 15.2842 15.973 15.0355C15.973 14.7869 15.8742 14.5484 15.6984 14.3726L12.8257 11.5L15.6984 8.62738C15.8742 8.45156 15.973 8.21311 15.973 7.96447C15.973 7.71583 15.8742 7.47737 15.6984 7.30155C15.5226 7.12574 15.2841 7.02697 15.0355 7.02697C14.7868 7.02697 14.5484 7.12574 14.3725 7.30155L11.4999 10.1742L8.6273 7.30155C8.45148 7.12574 8.21303 7.02697 7.96439 7.02697C7.71575 7.02697 7.47729 7.12574 7.30147 7.30155C7.12566 7.47737 7.02689 7.71583 7.02689 7.96447C7.02689 8.21311 7.12566 8.45156 7.30147 8.62738L10.1741 11.5L7.30147 14.3726C7.12566 14.5484 7.02689 14.7869 7.02689 15.0355C7.02689 15.2842 7.12566 15.5226 7.30147 15.6984C7.47729 15.8743 7.71575 15.973 7.96439 15.973C8.21303 15.973 8.45148 15.8743 8.6273 15.6984L11.4999 12.8258L14.3725 15.6984Z"
                fill="#31CFB3"
              />
            </svg>
            <p className={`${styles["btn-close__title"]} ${styles.btn__title}`}>
              Закрыть
            </p>
          </button>
          <button
            className={`${styles["btn-make"]} ${styles.btn}`}
            disabled={!siteName}
            onClick={makeNewSite}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5625 12.5C6.5625 12.7486 6.66127 12.9871 6.83709 13.1629C7.0129 13.3387 7.25136 13.4375 7.5 13.4375C7.74864 13.4375 7.9871 13.3387 8.16291 13.1629C8.33873 12.9871 8.4375 12.7486 8.4375 12.5V8.4375H12.5C12.7486 8.4375 12.9871 8.33873 13.1629 8.16291C13.3387 7.9871 13.4375 7.74864 13.4375 7.5C13.4375 7.25136 13.3387 7.0129 13.1629 6.83709C12.9871 6.66127 12.7486 6.5625 12.5 6.5625H8.4375V2.5C8.4375 2.25136 8.33873 2.0129 8.16291 1.83709C7.9871 1.66127 7.74864 1.5625 7.5 1.5625C7.25136 1.5625 7.0129 1.66127 6.83709 1.83709C6.66127 2.0129 6.5625 2.25136 6.5625 2.5V6.5625H2.5C2.25136 6.5625 2.0129 6.66127 1.83709 6.83709C1.66127 7.0129 1.5625 7.25136 1.5625 7.5C1.5625 7.74864 1.66127 7.9871 1.83709 8.16291C2.0129 8.33873 2.25136 8.4375 2.5 8.4375H6.5625V12.5Z"
                fill="black"
              />
            </svg>
            <p className={`${styles["btn-make__title"]} ${styles.btn__title} `}>
              Создать сайт
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalAreaModal;
