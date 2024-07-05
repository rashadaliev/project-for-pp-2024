import React from "react";
import styles from "../ShoppingCartModal/ShoppingCartModal.module.css";
import classNames from "classnames";
import { useState } from "react";
import axios from "axios";
const ShoppingCartModal = (props) => {
  const { cart, setCart } = props;
  const [bidData, setBidData] = useState({
    clientName: "",
    clientEmail: "",
    phone: "",
    adress: "",
    comment: "",
    amount: 0,
    productName: "",
    project_Id: localStorage.getItem("projectId"),
  });
  const bidDataChange = (e) => {
    setBidData({ ...bidData, [e.target.name]: e.target.value });
  };
  const bidDataFormSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = cart.goods.reduce(
      (total, good) => total + good.price * good.count,
      0
    );
    const productName = cart.goods.map((good) => good.name).join(" ");

    const updatedFormData = {
      ...bidData,
      productName: productName,
      amount: totalAmount,
    };
    await axios.post(`http://localhost:5231/api/Deal`, updatedFormData);
    setBidData({
      clientName: "",
      clientEmail: "",
      phone: "",
      adress: "",
      comment: "",
      amount: 0,
      productName: "",
      project_Id: localStorage.getItem("projectId"),
    });
    setCart({
      goods: [],
      generalCount: 0,
      isOpen: false,
    });
  };
  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const newGoods = prevCart.goods.map((good) =>
        good.id === id ? { ...good, count: good.count + 1 } : good
      );
      return {
        ...prevCart,
        goods: newGoods,
        generalCount: prevCart.generalCount + 1,
      };
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const newGoods = prevCart.goods
        .map((good) =>
          good.id === id ? { ...good, count: good.count - 1 } : good
        )
        .filter((good) => good.count > 0); // Удаляем товары с count <= 0

      return {
        ...prevCart,
        goods: newGoods,
        generalCount:
          prevCart.generalCount - 1 >= 0 ? prevCart.generalCount - 1 : 0,
      };
    });
  };
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newGoods = prevCart.goods.filter((good) => good.id !== id);
      const removedGood = prevCart.goods.find((good) => good.id === id);
      return {
        ...prevCart,
        goods: newGoods,
        generalCount:
          prevCart.generalCount - (removedGood ? removedGood.count : 0),
      };
    });
  };

  const closeModal = () => {
    setCart((prevCart) => ({
      ...prevCart,
      isOpen: false,
    }));
  };
  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: cart.isOpen,
      })}
      onClick={closeModal}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles["cartwin-top"]}>Ваш заказ:</h3>
        <div className={styles["cartwin-products"]}>
          {cart.goods.map((good) => (
            <div className={styles.product} data-cart-product-i={good.id}>
              <div className={styles["product-thumb"]}>
                <img
                  src={good.image}
                  alt=""
                  className={styles["product-img"]}
                />
              </div>
              <div className={styles["product-title"]}>{good.name}</div>
              <div className={styles["product-plusminus"]}>
                <span
                  className={styles["product-minus"]}
                  onClick={() => decreaseQuantity(good.id)}
                >
                  -
                </span>
                <span className={styles["product-quantity"]}>{good.count}</span>
                <span
                  className={styles["product-plus"]}
                  onClick={() => increaseQuantity(good.id)}
                >
                  +
                </span>
              </div>
              <div className={styles["product-amount"]}>
                {good.price * good.count} р
              </div>
              <div
                className={styles["product-del"]}
                onClick={() => removeFromCart(good.id)}
              >
                x
              </div>
            </div>
          ))}
        </div>
        <div className={styles["cartwin-bottom"]}>
          <h3>
            Сумма:{" "}
            {cart.goods.reduce(
              (total, good) => total + good.price * good.count,
              0
            )}{" "}
            р
          </h3>
        </div>
        <form className={styles["form-container"]} onSubmit={bidDataFormSubmit}>
          <label htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            name="clientName"
            onChange={bidDataChange}
            value={bidData.clientName}
          />

          <label htmlFor="email">Ваш Email</label>
          <input
            type="text"
            id="email"
            name="clientEmail"
            onChange={bidDataChange}
            value={bidData.clientEmail}
          />

          <label htmlFor="phone">Ваш телефон</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={bidDataChange}
            value={bidData.phone}
          />

          <label htmlFor="adress">Адрес доставки</label>
          <input
            type="text"
            id="adress"
            name="adress"
            onChange={bidDataChange}
            value={bidData.adress}
          />

          <label htmlFor="comment">Комментарий</label>
          <textarea
            id="comment"
            name="comment"
            onChange={bidDataChange}
            value={bidData.comment}
          ></textarea>

          <div className={styles["cartwin-prodamount-wrap"]}>
            <span className={styles["cartwin-prodamount"]}>
              Итоговая Сумма:{" "}
              {cart.goods.reduce(
                (total, good) => total + good.price * good.count,
                0
              )}{" "}
              р
            </span>
          </div>
          <button type="submit">Оформить заказ</button>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
