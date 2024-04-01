import React, { useState } from "react";
import styles from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/k-small.png";
import axios from "axios";
const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "applocation/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };
  return (
    <div className={styles["reg-wrapper"]}>
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} action="" className={styles["form"]}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <input
            type="text"
            placeholder="Ваше имя"
            className={styles["form__input"]}
          />
          <input
            type="email"
            value={email}
            placeholder="Электронная почта"
            className={styles["form__input"]}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Пароль"
            className={styles["form__input"]}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles["form__button"]}>
            Зарегистрироваться
          </button>
          <Link to="/login" className={styles["help-link"]}>
            Уже зарегистрированы? Войти тут
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
