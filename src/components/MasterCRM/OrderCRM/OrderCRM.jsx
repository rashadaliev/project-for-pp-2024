import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../OrderCRM/OrderCRM.module.css";
const OrderCRM = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { status, amount, client, phone, adress, comment, created } = state;
  return (
    <div>
      <div>
        <div style={{ width: "900px", margin: "50px auto" }}>
          <button
            onClick={() => navigate("/crm")}
            className={styles["triangle-btn"]}
          >
            Назад
          </button>
          <h2 style={{ fontWeight: 700, fontSize: "24px", color: "#000" }}>
            Общая информация
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fff",
              borderRadius: "15px",
              padding: "25px 30px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 className={styles.field}>Статус</h3>
              <h3 style={{ margin: 0 }}>
                {created.split("T")[0].split("-").reverse().join(".")}
              </h3>
            </div>
            <p className={styles.value}>{status}</p>

            <ul style={{ listStyle: "none", padding: "0", margin: 0 }}>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>Сумма</h3>
                <p className={styles.value}>{amount}</p>
              </li>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>ФИО Клиента</h3>
                <p className={styles.value}>{client.name}</p>
              </li>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>Телефон</h3>
                <p className={styles.value}>{phone}</p>
              </li>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>Почта</h3>
                <p className={styles.value}>{client.email}</p>
              </li>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>Адрес доставки</h3>
                <p className={styles.value}>{adress}</p>
              </li>
              <li style={{ marginTop: "15px" }}>
                <h3 className={styles.field}>Комментарий</h3>
                <p className={styles.value}>{comment}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCRM;
