import React, { useEffect } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import logo from "../../assets/k-big.png";
import { Link, useFetcher } from "react-router-dom";
import PersonalAreaHeader from "../PersonalArea/PersonalAreaHeader/PersonalAreaHeader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
const LoginPage = () => {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  // изменение цвета placeholder, body при заходе на страницу
  useEffect(() => {
    const new_styles = {
      "--body-background-color": "#31CFB3",
      "--placeholder-color": "rgba(51,51,51, 0.5)",
    };
    Object.entries(new_styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    return () => {
      const last_styles = {
        "--body-background-color": "#eee",
        "--placeholder-color": "grey",
      };

      Object.entries(last_styles).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:5231/api/Autentification",
        logData,
        config
      );
      // response.data.username - выводит имя пользователя
      if (response.status == 200) {
        navigate("/projects");
      }
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage("Такой пользователь не найден");
      } else if (error.response.status === 401) {
        setErrorMessage("Неверный пароль");
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className={styles["log-wrapper"]}>
      <div className={styles["form-container"]}>
        <Link to="/" className={styles["link-logo"]}>
          <img src={logo} alt="" className={styles["logo"]} />
        </Link>
        <form action="" className={styles["form"]} onSubmit={handleSubmit}>
          <div className={styles["title-form"]}>ВХОД</div>
          <ErrorMessage message={errorMessage}></ErrorMessage>
          <input
            name="email"
            value={logData.email}
            type="email"
            className={styles["form__input"]}
            placeholder="Эл. почта"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            value={logData.password}
            className={styles["form__input"]}
            placeholder="Пароль"
            onChange={handleChange}
          />

          <button type="submit" className={styles["form__button"]}>
            Войти
          </button>
          <div className={styles["form__links"]}>
            <Link to="/registration" className={styles["form__link"]}>
              Зарегистрироваться
            </Link>
            <Link className={styles["form__link"]}>Забыли пароль?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
