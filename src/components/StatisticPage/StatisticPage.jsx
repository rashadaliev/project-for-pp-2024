import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import styles from "../StatisticPage/StatisticPage.module.css";
const StatisticPage = () => {
  const [statistic, setStatistic] = useState({
    totalCount: "",
    problemCount: "",
    goodSales: {},
  });
  const fetchStatistic = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Statistics?Project_id=${JSON.parse(
        localStorage.getItem("projectId")
      )}`
    );
    setStatistic(response.data);
  };
  useEffect(() => {
    fetchStatistic();
  }, []);
  return (
    <div className={styles.container}>
      <ul className={styles["list"]}>
        <li>
          <p>Кол-во заявок(всего)</p>
          <div>{statistic.totalCount}</div>
        </li>
        <li>
          <p>Кол-во проблемных заявок</p>
          <div>{statistic.problemCount}</div>
        </li>
        <li>
          <p>Проданные товары и их кол-во</p>
          {Object.entries(statistic.goodSales).map(([key, value]) => (
            <div key={key}>
              {key}: {value}
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default StatisticPage;
