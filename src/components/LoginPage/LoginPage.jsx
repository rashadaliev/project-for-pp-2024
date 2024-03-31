import React, { useEffect } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import logo from "../../assets/k.png";
import { Link, useFetcher } from "react-router-dom";
import PersonalAreaHeader from "../PersonalArea/PersonalAreaHeader/PersonalAreaHeader";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const NAME = "eee";

  const navigate = useNavigate();
  // изменение цвета placeholder, body при заходе на страницу
  useEffect(() => {
    const new_styles = {
      "--body-background-color":
        "linear-gradient(to top right, #ef6b50, #f8ad70)",
      "--placeholder-color": "#fad0c0",
    };
    Object.entries(new_styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    return () => {
      const last_styles = {
        "--body-background-color": "white",
        "--placeholder-color": "grey",
      };

      Object.entries(last_styles).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    };
  }, []);
  return (
    <div className={styles["log-wrapper"]}>
      <div className={styles["form-container"]}>
        <form action="" className={styles["form"]}>
          <Link to="/">
            <img src={logo} alt="" className={styles["logo"]} />
          </Link>
          <input
            type="email"
            className={styles["form__input"]}
            placeholder="Эл. почта"
          />

          <input
            type="password"
            className={styles["form__input"]}
            placeholder="Пароль"
          />

          <button
            type="button"
            className={styles["form__button"]}
            onClick={() => navigate("/projects", { state: { NAME } })}
          >
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
