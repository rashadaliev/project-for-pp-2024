import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import galka from "../../assets/galka.png";
import musor from "../../assets/musor.png";
const MasterCRM = (props) => {
  const { setSelectedSection } = props;
  const [stateCRM, setStateCRM] = useState("");
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
  const checkCRM = (stateCRM) => stateCRM === "Have site";
  useEffect(() => {
    setSelectedSection("CRM");
    fetchSites();
  }, []);

  return (
    <>
      {checkCRM(stateCRM) ? (
        <table className="w-75 m-auto table table-success table-striped text-center ">
          <thead>
            <tr>
              <th scope="col">Заявка</th>
              <th scope="col">Дата</th>
              <th scope="col">ФИО</th>
              <th scope="col">Сумма</th>
              <th scope="col">Статус</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>31.12.2024</td>
              <td>Алексей Алексеев</td>
              <td>12000</td>
              <td>
                <select name="" id="">
                  Ало
                </select>
              </td>
              <td>
                <button>
                  <img src={galka} alt="" />
                </button>
              </td>
              <td>
                <button className="">
                  <img src={musor} alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Грусть</div>
      )}
    </>
  );
};

export default MasterCRM;
