import React, { useEffect } from "react";
import styles from "../WhiteBusinessTemplate/WhiteBusinessTemplate.module.css";
import "../WhiteBusinessTemplate/WhiteBusinessTemplate.css";
import logoTemplates from "../../../assets/logoTemplates.png";
import vk from "../../../assets/vk.png";
import telega from "../../../assets/telega.png";
import btn_reverse from "../../../assets/btn-top.png";
import { useState } from "react";
import cardimgTemplate from "../../../assets/cardimgTemplate.png";
import HoverableBlock from "../../HoverableBlock/HoverableBlock";
import EditModal from "../../EditModal/EditModal";
import { Link, useNavigate } from "react-router-dom";
import cart_img from "../../../assets/button-cart.svg";
import classNames from "classnames";
import ModalCart from "./ModalCart/ModalCart";
import axios from "axios";
import { useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { BrowserRouter } from "react-router-dom";
const WhiteBusinessTemplate = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [goods, setGoods] = useState([]);
  const [cards, setCards] = useState([
    {
      id: 1,
      price: 2000,
      name: "Шапка дуделка",
      image: `${cardimgTemplate}`,
      desc: "",
    },
  ]);
  const [htmlContent, setHtmlContent] = useState("");
  useEffect(() => {
    const html = document.getElementById("white-business-template").innerHTML;
    setHtmlContent(html);
  }, [cards, uploadedImage]);
  const getProjectDetails = async () => {
    const response = await axios.get(
      `http://localhost:5231/api/Project?Master_id=${
        JSON.parse(localStorage.getItem("user")).client_id
      }`,
      {
        params: {
          id: JSON.parse(localStorage.getItem("user")).client_id,
        },
      }
    );
    return response.data;
  };

  const updateProject = async (description, content) => {
    const projectDetails = await getProjectDetails();
    const projectName = projectDetails.name;
    await axios.post(`http://localhost:5231/api/Project/Edit`, {
      master_Id: JSON.parse(localStorage.getItem("user")).client_id,
      name: projectName,
      description: description,
      content: content,
    });
    navigate("/projects", { state: { cards: cards } });
  };
  const addToCart = (id, name, price, image, desc) => {
    setCartCount(cartCount + 1);
    if (goods[id - 1]) {
      goods[id - 1].count += 1;
    } else {
      const newGood = {
        id: id,
        name: name,
        price: price,
        image: image,
        count: 1,
        desc: desc,
      };
      setGoods([...goods, newGood]);
    }
  };
  const handleOpenModal = (isOpen, elementId) => {
    setOpenModal(isOpen);
    setSelectedElementId(elementId);
  };
  const updateImage = (image) => {
    setUploadedImage(image);
    setOpenModal(false);
  };
  const [siteContent, setSiteContent] = useState(null);

  // const HTML = `<!DOCTYPE html>
  // <html lang="en">

  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>Document</title>
  // </head>

  // <body>
  //     <button style="color: red;">Алоха</button>;

  // </body>
  // <script>
  //   document.querySelector('button').addEventListener('click', () => {
  //       console.log("111");
  //   })
  // </script>

  // </html>`;
  // const iframeRef = useRef(null);

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     const iframe = iframeRef.current;
  //     const doc = iframe.contentDocument || iframe.contentWindow.document;
  //     doc.open();
  //     doc.write(HTML);
  //     doc.close();
  //   }
  // }, []);
  return (
    <div
      style={{
        width: "1200px",
        margin: "0 auto",
        backgroundColor: "white",
        position: "relative",
      }}
      id="white-business-template"
    >
      <button className="btn-cart" onClick={() => setOpenCartModal(true)}>
        <div className="button-cart-relative">
          <img src={cart_img} alt="" />
          <span
            className={`${styles["cart-count"]} ${
              cartCount > 0 ? styles.visible : ""
            }`}
          >
            {cartCount}
          </span>
        </div>
      </button>

      <button
        onClick={() => updateProject("White business", htmlContent)}
        className="btn-ready"
      >
        Наконец то сделал
      </button>
      <HoverableBlock
        setOpenModal={() => handleOpenModal(true, "block-header")}
      >
        <div className={styles["block-header"]} data-id={"block-header"}>
          <img
            src={uploadedImage ? uploadedImage : logoTemplates}
            alt=""
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        </div>
      </HoverableBlock>
      <HoverableBlock setOpenModal={() => handleOpenModal(true, "block-cards")}>
        <div className="block-cards">
          {cards.map((card) => (
            <div className={styles["card"]} data-id={card.id}>
              <img className={styles["card__title"]} src={card.image} alt="" />
              <p className={styles["card__price"]}>{card.price} р.</p>
              <p className={styles["card__desc"]}>{card.name}</p>
              <button
                className="card__btn-buy"
                onClick={() => {
                  addToCart(
                    card.id,
                    card.name,
                    card.price,
                    card.image,
                    card.desc
                  );
                }}
              >
                <p className={styles["card__btn-title"]}>Купить</p>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 1.875L1.41563 1.93C2.24063 2.205 2.65313 2.3425 2.88875 2.67C3.125 2.9975 3.125 3.4325 3.125 4.30187V5.9375C3.125 7.705 3.125 8.58938 3.67438 9.13813C4.22313 9.6875 5.1075 9.6875 6.875 9.6875H11.875"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.6875 11.25C4.93614 11.25 5.1746 11.3488 5.35041 11.5246C5.52623 11.7004 5.625 11.9389 5.625 12.1875C5.625 12.4361 5.52623 12.6746 5.35041 12.8504C5.1746 13.0262 4.93614 13.125 4.6875 13.125C4.43886 13.125 4.2004 13.0262 4.02459 12.8504C3.84877 12.6746 3.75 12.4361 3.75 12.1875C3.75 11.9389 3.84877 11.7004 4.02459 11.5246C4.2004 11.3488 4.43886 11.25 4.6875 11.25ZM10.3125 11.25C10.5611 11.25 10.7996 11.3488 10.9754 11.5246C11.1512 11.7004 11.25 11.9389 11.25 12.1875C11.25 12.4361 11.1512 12.6746 10.9754 12.8504C10.7996 13.0262 10.5611 13.125 10.3125 13.125C10.0639 13.125 9.8254 13.0262 9.64959 12.8504C9.47377 12.6746 9.375 12.4361 9.375 12.1875C9.375 11.9389 9.47377 11.7004 9.64959 11.5246C9.8254 11.3488 10.0639 11.25 10.3125 11.25Z"
                    stroke="black"
                  />
                  <path
                    d="M6.875 5.625H5"
                    stroke="black"
                    stroke-linecap="round"
                  />
                  <path
                    d="M3.125 3.75H10.2812C11.5656 3.75 12.2081 3.75 12.4862 4.17125C12.7637 4.59312 12.5112 5.18313 12.005 6.36375L11.7369 6.98875C11.5006 7.54 11.3825 7.815 11.1481 7.97C10.9131 8.125 10.6131 8.125 10.0137 8.125H3.125"
                    stroke="black"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </HoverableBlock>
      <HoverableBlock>
        <div className={styles["block-info"]}>
          <h3 className={styles["block-info__title"]}>Заголовок</h3>
          <p className={styles["block-info__desc"]}>
            Наш магазин продаёт товары только из качесвтенных переработанных
            материалов. Мы уважаем природу и стремимся поменять мир к лучшему,
            поэтому 5% с каждой продажи идут в фонд помощи “Детям Рашадам”
          </p>
        </div>
      </HoverableBlock>
      <HoverableBlock>
        <div className={styles["block-contacts"]}>
          <h3 className={styles["block-contacts__title"]}>
            Будьте с нами на связи
          </h3>
          <div className={styles["container-contacts"]}>
            <Link to="#">
              <img src={telega} alt="" className={styles["contacts-telega"]} />
            </Link>
            <Link to="#">
              <img src={vk} alt="" className={styles["contacts-vk"]} />
            </Link>
          </div>
        </div>
      </HoverableBlock>
      <hr style={{ height: "30px", border: "none" }} />
      <div className={styles["block-footer"]}>
        <HoverableBlock
          setOpenModal={() => handleOpenModal(true, "block-header")}
        >
          <div className={styles["block-header"]} data-id={"block-header"}>
            <img
              src={uploadedImage ? uploadedImage : logoTemplates}
              alt=""
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </div>
        </HoverableBlock>
        <a href="mailto:konstruct@mail.ru" className={styles["footer__mail"]}>
          konstruct@mail.ru
        </a>
        <textarea
          className={styles["footer-textarea"]}
          name=""
          id=""
          cols="50"
          rows="10"
          placeholder="Любой текст, в любых количествах"
        ></textarea>
        <button style={{ background: "transparent", border: "none" }}>
          <img src={btn_reverse} alt="" />
        </button>
      </div>

      <EditModal
        openModal={openModal}
        close={() => setOpenModal(false)}
        updateImage={updateImage}
        selectedElementId={selectedElementId}
        cards={cards}
        setCards={setCards}
      ></EditModal>
      <ModalCart
        openCartModal={openCartModal}
        close={() => setOpenCartModal(false)}
        goods={goods}
        setGoods={setGoods}
        cartCount={cartCount}
        setCartCount={setCartCount}
      ></ModalCart>
    </div>
  );
};

export default WhiteBusinessTemplate;
