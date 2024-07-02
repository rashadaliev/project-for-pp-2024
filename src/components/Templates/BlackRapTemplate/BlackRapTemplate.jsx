import React from "react";
import { useState } from "react";
import styles from "../BlackRapTemplate/BlackRapTemplate.module.css";
import HoverableBlock from "../../HoverableBlock/HoverableBlock";
import logoTemplates from "../../../assets/logoTemplates.png";
import EditModal from "../../EditModal/EditModal";
import t_shirt_img from "../../../assets/white_t_shirt.png";
const BlackRapTemplate = () => {
  const [uploadedImage, setUploadedImage] = useState(null); //обновление картинки
  const [openModal, setOpenModal] = useState(false); // открытие модального окна для редактирования
  const [selectedElementId, setSelectedElementId] = useState(null);
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
              <button className={styles["card__btn-buy"]}>
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

      <EditModal
        openModal={openModal}
        close={() => setOpenModal(false)}
        selectedElementId={selectedElementId}
        updateImage={updateImage}
        cards={cards}
        setCards={setCards}
      ></EditModal>
    </div>
  );
};

export default BlackRapTemplate;
