import React, { useState } from "react";
import styles from "../ModalCart/ModalCart.module.css";
import classNames from "classnames";
import minus from "../../../../assets/arrows_circle_minus.svg";
import plus from "../../../../assets/arrows_circle_plus.svg";
import del from "../../../../assets/arrows_circle_remove.svg";
import { Link } from "react-router-dom";
import axios from "axios";
const ModalCart = (props) => {
  const { openCartModal, close, goods, setGoods, setCartCount, cartCount } =
    props;
  const [formData, setFormData] = useState({
    amount: 3,
    productName: "",
    clientEmail: "",
    clientName: "",
    project_Id: 2,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5231/api/Deal`, formData);
    close();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const increaseQuantity = (id) => {
    setGoods((prevGoods) => {
      const updatedGoods = prevGoods.map((good) =>
        good.id === id ? { ...good, count: good.count + 1 } : good
      );
      return updatedGoods;
    });
    setCartCount(cartCount + 1);
  };

  const decreaseQuantity = (id) => {
    setGoods((prevGoods) => {
      const updatedGoods = prevGoods.map((good) =>
        good.id === id && good.count > 0
          ? { ...good, count: good.count - 1 }
          : good
      );

      if (updatedGoods.some((good) => good.id === id && good.count === 0)) {
        return updatedGoods.filter((good) => good.id !== id);
      }

      return updatedGoods;
    });
    setCartCount(cartCount - 1);
  };
  const deleteGood = (id) => {
    setCartCount(cartCount - goods[id].count);
    setGoods((prevGoods) => {
      return prevGoods.filter((good) => good.id !== id);
    });
  };
  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: openCartModal,
      })}
      onClick={close}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <>
          <p className={styles["cartwin-heading"]}>Ваш заказ:</p>
          <div className={styles["cartwin-products"]}>
            {goods.map((good) => (
              <div className={styles["product"]}>
                <div className={styles["product-thumb"]}>
                  <img
                    className={styles["product-img"]}
                    src={good.image}
                    alt=""
                  />
                </div>
                <div className={styles["product-title"]}>
                  <a
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                    href=""
                  >
                    {good.name}
                  </a>
                </div>
                <div className={styles["product-plusminus"]}>
                  <span
                    className={styles["product-minus"]}
                    onClick={() => decreaseQuantity(good.id)}
                  >
                    <img
                      style={{ width: "16px", height: "16px", border: 0 }}
                      src={minus}
                      alt=""
                    />
                  </span>
                  <span className={styles["product-quantity"]}>
                    {good.count}
                  </span>
                  <span
                    className={styles["product-plus"]}
                    onClick={() => increaseQuantity(good.id)}
                  >
                    <img
                      src={plus}
                      alt=""
                      style={{ width: "16px", height: "16px", border: 0 }}
                    />
                  </span>
                </div>
                <div className={styles["product-amount"]}>
                  <div className={styles["prodamount-price"]}>
                    {good.price * good.count}
                  </div>
                  <div className={styles["prodamount-currency"]}>р.</div>
                </div>
                <div
                  className={styles["product-del-wrapper"]}
                  onClick={() => deleteGood(good.id)}
                >
                  <img src={del} alt="" className={styles["product-del"]} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles["cartwin-bottom"]}>
            <div className={styles["cartwin-prodamount-wrap"]}>
              <span className={styles["cartwin-prodamount-label"]}>
                Сумма:{" "}
              </span>
              <span className={styles["cartwin-prodamount"]}>
                {goods.reduce((acc, item) => acc + +item.price * item.count, 0)}
              </span>
            </div>
          </div>
          <div className={styles["orderform-cont"]}>
            <form onSubmit={handleSubmit} className={styles["orderform"]}>
              <label htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="clientName"
                onChange={handleChange}
                value={formData.clientName}
              />

              <label htmlFor="email">Ваш Email</label>
              <input
                type="text"
                id="email"
                name="clientEmail"
                onChange={handleChange}
                value={formData.clientEmail}
              />

              <label htmlFor="phone">Ваш телефон</label>
              <input
                type="text"
                id="phone"
                name="phone"
                // onChange={handleChange}
                // value={formData.phone}
              />

              <label htmlFor="address">Адрес доставки</label>
              <input
                type="text"
                id="address"
                name="address"
                // onChange={handleChange}
                // value={formData.address}
              />

              <label htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                // onChange={handleChange}
                // value={formData.comment}
              ></textarea>

              <div className={styles["cartwin-prodamount-wrap"]}>
                <span className={styles["cartwin-prodamount-label"]}>
                  Сумма:{" "}
                </span>
                <span className={styles["cartwin-prodamount"]}>
                  {goods.reduce(
                    (acc, item) => acc + +item.price * item.count,
                    0
                  )}
                </span>
              </div>
              <button type="submit">Оформить заказ</button>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default ModalCart;
