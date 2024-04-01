import React, { useEffect } from "react";
import styles from "../LoginPage/LoginPage.module.css";
import logo from "../../assets/k-big.png";
import { Link, useFetcher } from "react-router-dom";
import PersonalAreaHeader from "../PersonalArea/PersonalAreaHeader/PersonalAreaHeader";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const NAME = "eee";

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
        <Link to="/" className={styles["link-logo"]}>
          <img src={logo} alt="" className={styles["logo"]} />
        </Link>
        <form action="" className={styles["form"]}>
          <div className={styles["title-form"]}>ВХОД</div>
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
