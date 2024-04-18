import React, { useState, useEffect } from "react";
import styles from "./RegistrationPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/k-logo.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
const RegistrationPage = () => {
  useEffect(() => {
    const new_styles = {
      "--body-background-color": "#2590CC",
    };
    Object.entries(new_styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    return () => {
      const last_styles = {
        "--body-background-color": "#eee",
      };

      Object.entries(last_styles).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    };
  }, []);

  const [regData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("http://localhost:5231/api/MasterReg", regData, config);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className={styles["reg-wrapper"]}>
      <div className={styles["form-container"]}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
        <form onSubmit={handleSubmit} action="" className={styles["form"]}>
          <div className={styles["title-form"]}>Регистрация</div>
          <input
            type="text"
            name="username"
            value={regData.username}
            placeholder="Ваше имя"
            className={styles["form__input"]}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={regData.email}
            placeholder="Электронная почта"
            className={styles["form__input"]}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={regData.password}
            placeholder="Пароль"
            className={styles["form__input"]}
            onChange={handleChange}
          />
          <button type="submit" className={styles["form__button"]}>
            Зарегистрироваться
          </button>
          <Link to="/login" className={styles["help-link"]}>
            Уже зарегистрированы? <u>Войти тут</u>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
