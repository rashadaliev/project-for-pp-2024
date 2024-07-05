import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import galka from "../../assets/galka.png";
import musor from "../../assets/musor.png";
import { useNavigate } from "react-router-dom";
import styles from "../MasterCRM/MasterCRM.module.css";
import PopUpArchive from "../PopUpArchive/PopUpArchive";
import HeaderCRM from "./HeaderCRM/HeaderCRM";
const MasterCRM = (props) => {
  const { setSelectedSection } = props;
  const [stateCRM, setStateCRM] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [statusToArchive, setStatusToArchive] = useState("positive");
  const activeOrders = orders.filter((order) => order.isArchive === false);
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

  const handleChangeStatus = async (orderId, newStatus) => {
    await axios.patch("http://localhost:5231/api/Deal/Status", {
      dealId: orderId,
      status: newStatus,
    });
    const currentStatus = document.querySelector("#filters").value;
    handleFilterChange(currentStatus);
  };

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    handleChangeStatus(orderId, newStatus);
  };
  const checkCRM = (stateCRM) => stateCRM === "Have site";
  useEffect(() => {
    setSelectedSection("CRM");
    fetchSites();
    fetchOrders();
  }, []);
  const getFilteredBids = async (status) => {
    const response = await axios.get(
      `http://localhost:5231/api/Deal/Status?Project_id=${JSON.parse(
        localStorage.getItem("projectId")
      )}&status=${status}`
    );
    setOrders(response.data);
  };
  const handleFilterChange = async (status) => {
    if (status === "Не выбрано") {
      fetchOrders();
    } else {
      getFilteredBids(status);
    }
  };
  return (
    <>
      {checkCRM(stateCRM) ? (
        <div>
          <div className={styles["filters"]}>
            <label htmlFor="filters">Фильтрация по статусам</label>
            <select
              name="filters"
              id="filters"
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="Не выбрано">Не выбрано</option>
              <option value="Создан">Создан</option>
              <option value="Оплачено">Оплачено</option>
              <option value="В работе">В работе</option>
              <option value="В пути">В пути</option>
              <option value="Доставлено">Доставлено</option>
            </select>
          </div>
          <table
            style={{
              textAlign: "center",
              margin: "10px auto 50px",
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
              {activeOrders.map((order, index) => (
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
                      value={order.status}
                      onChange={(e) => handleStatusChange(e, order.id)}
                    >
                      <option value="Создан">Создан</option>
                      <option value="Оплачено">Оплачено</option>
                      <option value="В работе">В работе</option>
                      <option value="В пути">В пути</option>
                      <option value="Доставлено">Доставлено</option>
                    </select>
                  </td>
                  <td
                    style={{
                      padding: "10px",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Cделать проверку на статус(если он не равен Сделано), то
                        if (order.status !== "Доставлено") {
                          setStatusToArchive("negative");
                        } else {
                          setStatusToArchive("positive");
                        }
                        setOpenModal(true);
                      }}
                      style={{
                        background: "inherit",
                        border: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      В архив
                    </button>
                    <PopUpArchive
                      openModal={openModal}
                      close={() => setOpenModal(false)}
                      statusArchive={statusToArchive}
                      orderId={order.id}
                      fetchOrders={fetchOrders}
                    ></PopUpArchive>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Грусть</div>
      )}
    </>
  );
};

export default MasterCRM;
