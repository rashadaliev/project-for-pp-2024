import React from "react";
import { useState } from "react";
import styles from "../BlackRapTemplate/BlackRapTemplate.module.css";
import HoverableBlock from "../../HoverableBlock/HoverableBlock";
import logoTemplates from "../../../assets/logoTemplates.png";
import EditModal from "../../EditModal/EditModal";
import t_shirt_img from "../../../assets/white_t_shirt.png";
import cart from "../../../assets/cart.svg";
import tgLogo from "../../../assets/tg-logo-footer.svg";
import vkLogo from "../../../assets/vk-logo-footer.svg";
import emailLogo from "../../../assets/email-logo-footer.svg";
import footerLogo from "../../../assets/logo-footer.svg";
import { Link } from "react-router-dom";
const BlackRapTemplate = () => {
  const [uploadedImage, setUploadedImage] = useState(null); //обновление картинки
  const [openModal, setOpenModal] = useState(false); // открытие модального окна для редактирования
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [linksWithoutTitle, setLinksWithoutTitle] = useState([
    {
      id: 1,
      iconType: "vk",
      link: "#",
    },
    {
      id: 2,
      iconType: "tg",
      link: "#",
    },
  ]);
  const [infoQA, setInfoQA] = useState({
    title: "Info",
    font: "Comfortaa",
    fontSize: "16px",
    fontWeight: "normal",
    sections: [
      {
        id: 1,
        title: "Оплата",
        content: "Оплата возможна через любой удобный для Вас способ...",
        open: false,
      },
      {
        id: 2,
        title: "Доставка",
        content: "",
        open: false,
      },
    ],
  });
  const [cards, setCards] = useState([
    {
      id: 1,
      price: 2000,
      name: "aupaECRU",
      image: `${t_shirt_img}`,
      desc: "",
      width: 300,
      height: 300,
      isDiscount: false,
      newPrice: "",
      strikeThrough: "none",
      strikeThroughColor: "#bdbdbd",
      oldPriceColor: "#bdbdbd",
      buttonText: "Купить",
      buttonBackground: "#31cfb3",
      buttonIcon: "",
      widthSvg: 15,
      heightSvg: 15,
    },
  ]); //карточки
  const handleOpenModal = (isOpen, elementId) => {
    setOpenModal(isOpen);
    setSelectedElementId(elementId);
  };
  const updateImage = (image) => {
    setUploadedImage(image);
    setOpenModal(false);
  };
  const handleToggle = (id) => {
    setInfoQA((prevInfoQA) => ({
      ...prevInfoQA,
      sections: prevInfoQA.sections.map((section) =>
        section.id === id ? { ...section, open: !section.open } : section
      ),
    }));
  };
  return (
    <div className={styles.container} id="white-business-template">
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
              <img
                className={styles["card__title"]}
                src={card.image}
                alt=""
                width={card.width}
                height={card.height}
              />
              <p className={styles["card__desc"]}>{card.name}</p>
              <p className={styles["card__price"]}>
                {card.isDiscount ? (
                  <>
                    <span className={styles["new-price"]}>
                      {card.newPrice} р.
                    </span>
                    <span
                      style={{
                        textDecoration:
                          card.strikeThrough === "straight"
                            ? "line-through"
                            : "none",
                        textDecorationColor: card.strikeThroughColor,
                        color: card.oldPriceColor,
                      }}
                    >
                      {card.price} р.
                    </span>
                  </>
                ) : (
                  `${card.price} р`
                )}
              </p>
              <button
                className={styles["card__btn-buy"]}
                style={{
                  backgroundColor: card.buttonBackground,
                }}
              >
                <p className={styles["card__btn-title"]}>{card.buttonText}</p>
                <img
                  src={card.buttonIcon || cart}
                  alt=""
                  style={{
                    marginLeft: card.buttonText ? "8px" : "0px",
                  }}
                  height={card.heightSvg}
                  width={card.widthSvg}
                />
              </button>
            </div>
          ))}
        </div>
      </HoverableBlock>
      <HoverableBlock
        setOpenModal={() => handleOpenModal(true, "block-infoQA")}
      >
        <div className={styles["container-info"]}>
          {infoQA.title && (
            <h1
              style={{
                fontFamily: infoQA.font,
                fontSize: infoQA.fontSize,
                fontWeight: infoQA.fontWeight,
              }}
            >
              {infoQA.title}
            </h1>
          )}
          <div className={styles["info-qa"]}>
            {infoQA.sections.map((section) => (
              <div key={section.id} className={styles["qa-section"]}>
                <div className={styles["qa-header"]}>
                  <h3 className={styles["qa-title"]}>{section.title}</h3>
                  <button onClick={() => handleToggle(section.id)}>
                    {section.open ? "−" : "+"}
                  </button>
                </div>
                {section.open && (
                  <p className={styles["qa-content"]}>{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </HoverableBlock>
      <hr />
      <HoverableBlock
        setOpenModal={() => handleOpenModal(true, "block-links-without-title")}
      >
        <div className={styles["footer-contacts"]}>
          {linksWithoutTitle.map((el) => (
            <Link to={el.link} target="_blank">
              {el.iconType === "vk" && <img src={vkLogo} alt="" />}
              {el.iconType === "tg" && <img src={tgLogo} alt="" />}
              {el.iconType === "email" && <img src={emailLogo} alt="" />}
              {el.iconType === "logo" && <img src={footerLogo} alt="" />}
            </Link>
          ))}
        </div>
      </HoverableBlock>
      <p>2024 © KONSTRUCT WEBSITE SAMPLE</p>

      <EditModal
        openModal={openModal}
        close={() => setOpenModal(false)}
        selectedElementId={selectedElementId}
        updateImage={updateImage}
        cards={cards}
        setCards={setCards}
        infoQA={infoQA}
        setInfoQA={setInfoQA}
        linksWithoutTitle={linksWithoutTitle}
        setLinksWithoutTitle={setLinksWithoutTitle}
      ></EditModal>
    </div>
  );
};

export default BlackRapTemplate;
