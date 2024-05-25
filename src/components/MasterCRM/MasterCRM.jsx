import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import galka from "../../assets/galka.png";
import musor from "../../assets/musor.png";
import { useNavigate } from "react-router-dom";
import styles from "../MasterCRM/MasterCRM.module.css";
const MasterCRM = (props) => {
  const { setSelectedSection } = props;
  const [stateCRM, setStateCRM] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const openOrder = (number) => {
    navigate("/order", {
      state: orders.find((order) => order.id === number),
    });
  };
  const fetchSites = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Project?Master_id=${
        JSON.parse(localStorage.getItem("user")).client_id
      }`
    );
    if (response.data.name === undefined) {
      setStateCRM("No site");
    } else {
      setStateCRM("Have site");
    }
  };
  const fetchOrders = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Deal?Project_id=${JSON.parse(
        localStorage.getItem("projectId")
      )}`
    );
    setOrders(response.data);
  };
  const checkCRM = (stateCRM) => stateCRM === "Have site";
  useEffect(() => {
    setSelectedSection("CRM");
    fetchSites();
    fetchOrders();
  }, []);

  return (
    <>
      {checkCRM(stateCRM) ? (
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
                Дата
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
                scope="col"
                style={{
                  padding: "10px",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#000",
                }}
              >
                Статус
              </th>
              <th
                colSpan="2"
                style={{
                  padding: "10px",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#000",
                }}
              ></th>
            </tr>
          </thead>
          <tbody className={styles["tbody-table"]}>
            {orders.map((order, index) => (
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
                <td style={{ padding: "10px" }}>
                  <select
                    name=""
                    id=""
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <option value="" selected>
                      {order.status}
                    </option>
                    <option value="">Оплачено</option>
                    <option value="">В работе</option>
                    <option value="">В пути</option>
                    <option value="">Доставлено</option>
                  </select>
                </td>
                <td
                  colSpan="2"
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      background: "inherit",
                      border: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <img src={galka} alt="" />
                  </button>
                  <button
                    className=""
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      background: "inherit",
                      border: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <img src={musor} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Грусть</div>
      )}
    </>
  );
};

export default MasterCRM;
