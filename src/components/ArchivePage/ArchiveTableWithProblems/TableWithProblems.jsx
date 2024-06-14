import React from "react";
import styles from "../ArchiveTableWithProblems/TableWithProblems.module.css";
const TableWithProblems = ({ orders }) => {
  return (
    <>
      <table
        style={{
          textAlign: "center",
          margin: "50px auto",
          background: "#31cfb3",
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.25)",
          borderSpacing: 0,
          width: "1100px",
        }}
      >
        <caption
          style={{
            fontWeight: 700,
            fontSize: "30px",
            marginBottom: "10px",
          }}
        >
          Проблемные заявки
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              Заявка
            </th>
            <th
              scope="col"
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              Дата Создания
            </th>
            <th
              scope="col"
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              ФИО
            </th>
            <th
              scope="col"
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              Сумма
            </th>

            <th
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              Причина
            </th>
            <th
              style={{
                padding: "10px",
                fontWeight: 700,
                fontSize: "20px",
                color: "#000",
              }}
            >
              Комментарий
            </th>
          </tr>
        </thead>
        <tbody className={styles["tbody-table"]}>
          {orders &&
            orders.map((order, index) => (
              <tr
                key={order.id}
                onClick={() => openOrder(order.id)}
                className={styles["rows-table"]}
              >
                <th scope="row" style={{ padding: "10px" }}>
                  {index + 1}
                </th>
                <td style={{ padding: "10px" }}>
                  {order.created.split("T")[0].split("-").reverse().join(".")}
                </td>

                <td style={{ padding: "10px" }}>{order.client.name}</td>
                <td style={{ padding: "10px" }}>{order.amount}</td>

                <td
                  style={{
                    padding: "10px",
                  }}
                >
                  {order.reason}
                </td>
                <td
                  style={{
                    padding: "10px",
                  }}
                >
                  {order.reasonComment}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TableWithProblems;
