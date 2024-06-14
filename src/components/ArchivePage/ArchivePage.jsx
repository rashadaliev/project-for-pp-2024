import React, { useEffect } from "react";
import styles from "../ArchivePage/ArchivePage.module.css";
import { useNavigate } from "react-router-dom";
import TableWithoutProblems from "./ArchiveTableWithOutProblems/TableWithoutProblems";
import TableWithProblems from "./ArchiveTableWithProblems/TableWithProblems";
import axios from "axios";
import { useState } from "react";
const ArchivePage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const [problemOrders, setProblemOrders] = useState();
  useEffect(() => {
    fetchArchive();
    fetchProblemArchive();
  }, []);
  const fetchArchive = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Archive?Project_id=${JSON.parse(
        localStorage.getItem("projectId")
      )}`
    );
    setOrders(response.data);
  };
  const fetchProblemArchive = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Archive/withProblem?Project_id=${JSON.parse(
        localStorage.getItem("projectId")
      )}`
    );
    setProblemOrders(response.data);
  };
  return (
    <>
      <TableWithoutProblems orders={orders}></TableWithoutProblems>
      <TableWithProblems orders={problemOrders}></TableWithProblems>
    </>
  );
};

export default ArchivePage;
