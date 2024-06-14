import React from "react";
import styles from "../PopUpArchive/PopUpArchive.module.css";
import classNames from "classnames";
import axios from "axios";
import { useState } from "react";
const PopUpArchive = ({
  openModal,
  close,
  statusArchive,
  orderId,
  fetchOrders,
}) => {
  const transitionToArchive = async (reason, comment) => {
    await axios.patch("http://localhost:5231/api/Deal/Archive", {
      dealId: orderId,
      isProblem: statusArchive == "negative",
      reason: reason,
      reasonComment: comment,
    });
    close();
    fetchOrders();
  };
  const [formData, setFormData] = useState({
    reason: "",
    comment: "",
  });
  const changeFieldForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: openModal,
      })}
      onClick={(e) => {
        close();
        e.stopPropagation();
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div>
          {statusArchive == "negative" ? (
            <div className={styles["container"]}>
              <p>Проблемная заявка?</p>
              <div className={styles["container-labels"]}>
                <label htmlFor="">
                  <p>Выберите причину</p>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={changeFieldForm}
                  >
                    <option value="Не оплатил">Не оплатил</option>
                    <option value="Не выходит на связь">
                      Не выходит на связь
                    </option>
                    <option value="Другое">Другое</option>
                  </select>
                </label>
                <label htmlFor="">
                  <p>Комментарий</p>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={changeFieldForm}
                  ></textarea>
                </label>
              </div>
              <button
                className={styles["btn"]}
                onClick={() =>
                  transitionToArchive(formData.reason, formData.comment)
                }
              >
                Отправить в архив
              </button>
            </div>
          ) : (
            <div className={styles["container"]}>
              <p>Вы точно уверены, что хотите отправить заявку в архив?</p>
              <div class={styles["container-btns"]}>
                <button onClick={() => transitionToArchive(null, null)}>
                  Да
                </button>
                <button onClick={() => close()}>Нет</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpArchive;
