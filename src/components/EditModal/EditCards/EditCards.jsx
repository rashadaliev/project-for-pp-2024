import React, { useEffect } from "react";
import styles from "../EditCards/EditCards.module.css";
import { useState } from "react";
import { ChromePicker } from "react-color";

const EditCards = (props) => {
  const { cards, setCards } = props;
  const [tempCards, setTempCards] = useState(cards);
  const addNewCard = () => {
    const newCard = {
      id: tempCards.length + 1,
      price: "",
      name: "",
      image: "",
      desc: "",
      width: "",
      height: "",
      isDiscount: false,
      newPrice: "",
      strikeThrought: "none",
      strikeThroughColor: "#bdbdbd",
      oldPriceColor: "#bdbdbd",
      buttonText: "Купить",
      buttonBackground: "#fff",
      buttonIcon: "",
      widthSvg: 15,
      heightSvg: 15,
    };
    setTempCards([...tempCards, newCard]);
    setCards([...tempCards, newCard]);
  };

  const saveChanges = () => {
    setCards(tempCards);
  };

  const handleInputChange = (index, field, newValue) => {
    const newTempCards = [...tempCards];
    if (field === "isDiscount" && !newValue) {
      newTempCards[index]["previousValues"] = {
        newPrice: newTempCards[index]["newPrice"],
        strikeThrough: newTempCards[index]["strikeThrough"],
        strikeThroughColor: newTempCards[index]["strikeThroughColor"],
      };
    }
    newTempCards[index][field] = newValue;
    setTempCards(newTempCards);
  };

  const handleFileChange = (index, event, field) => {
    const newTempCards = [...tempCards];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newTempCards[index][field] = reader.result;
        setTempCards(newTempCards);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (indexToDelete) => {
    const newCards = tempCards.filter((_, index) => index != indexToDelete);
    setTempCards(newCards);
    setCards(newCards);
  };

  return (
    <div>
      <button onClick={saveChanges}>Сохранить</button>
      {tempCards.map((card, index) => (
        <div>
          <div className={styles["card-edit-container"]} key={card.id}>
            <div>
              <p>{`Номер карточки - ${index + 1}`}</p>
              <button onClick={() => handleDelete(index)}>X</button>
            </div>

            <label htmlFor={`card-name-${index}`}>Название</label>
            <input
              type="text"
              value={card.name}
              id={`card-name-${index}`}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />

            <label htmlFor={`card-price-${index}`}>Цена</label>
            <input
              type="text"
              value={card.price}
              onChange={(e) =>
                handleInputChange(index, "price", e.target.value)
              }
              id={`card-price-${index}`}
            />

            <label htmlFor={`card-image-${index}`}>Изображение</label>
            <input
              type="file"
              id={`card-image-${index}`}
              onChange={(e) => handleFileChange(index, e, "image")}
            />

            <label htmlFor={`card-width-${index}`}>Ширина</label>
            <input
              type="number"
              value={card.width}
              onChange={(e) =>
                handleInputChange(index, "width", e.target.value)
              }
              id={`card-width-${index}`}
            />

            <label htmlFor={`card-height-${index}`}>Высота</label>
            <input
              type="number"
              value={card.height}
              onChange={(e) =>
                handleInputChange(index, "height", e.target.value)
              }
              id={`card-height-${index}`}
            />

            <label htmlFor={`card-desc-${index}`}>Описание</label>
            <input
              type="text"
              value={card.desc}
              id={`card-desc-${index}`}
              onChange={(e) => handleInputChange(index, "desc", e.target.value)}
            />

            <label htmlFor={`card-buttonText-${index}`}>Текст кнопки</label>
            <input
              type="text"
              value={card.buttonText}
              id={`card-buttonText-${index}`}
              onChange={(e) =>
                handleInputChange(index, "buttonText", e.target.value)
              }
            />

            <label htmlFor={`card-buttonBackground-${index}`}>
              Цвет фона кнопки
            </label>
            <input
              type="color"
              value={card.buttonBackground}
              id={`card-buttonBackground-${index}`}
              onChange={(e) =>
                handleInputChange(index, "buttonBackground", e.target.value)
              }
            />

            <label htmlFor={`card-buttonIcon-${index}`}>Иконка кнопки</label>
            <input
              type="file"
              id={`card-buttonIcon-${index}`}
              onChange={(e) => handleFileChange(index, e, "buttonIcon")}
            />

            <label htmlFor={`card-widthSvg-${index}`}>Ширина иконки</label>
            <input
              type="number"
              value={card.widthSvg}
              onChange={(e) =>
                handleInputChange(index, "widthSvg", e.target.value)
              }
              id={`card-widthSvg-${index}`}
            />

            <label htmlFor={`card-heightSvg-${index}`}>Высота иконки</label>
            <input
              type="number"
              value={card.heightSvg}
              onChange={(e) =>
                handleInputChange(index, "heightSvg", e.target.value)
              }
              id={`card-heightSvg-${index}`}
            />

            <label htmlFor={`card-isDiscount-${index}`}>
              Скидочная карточка
            </label>
            <input
              type="checkbox"
              checked={card.isDiscount}
              id={`card-isDiscount-${index}`}
              onChange={(e) =>
                handleInputChange(index, "isDiscount", e.target.checked)
              }
            />

            {card.isDiscount && (
              <>
                <label htmlFor={`card-newPrice-${index}`}>Новая цена</label>
                <input
                  type="text"
                  value={card.newPrice || ""}
                  onChange={(e) =>
                    handleInputChange(index, "newPrice", e.target.value)
                  }
                  id={`card-newPrice-${index}`}
                />

                <label
                  htmlFor={`card-strikeThrough-${index}`}
                  className={styles["style-strikeThrough"]}
                >
                  Стиль зачёркивания
                </label>
                <select
                  value={card.strikeThrough}
                  id={`card-strikeThrough-${index}`}
                  onChange={(e) =>
                    handleInputChange(index, "strikeThrough", e.target.value)
                  }
                >
                  <option value="none">Без зачёркивания</option>
                  <option value="straight">Прямое</option>
                </select>

                <label
                  htmlFor={`card-strikeThroughColor-${index}`}
                  className={styles["color-through"]}
                >
                  Цвет зачёркивания
                </label>
                <input
                  type="color"
                  value={card.strikeThroughColor}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "strikeThroughColor",
                      e.target.value
                    )
                  }
                />

                <label
                  htmlFor={`card-oldPriceColor-${index}`}
                  className={styles["color-old-price"]}
                >
                  Цвет старой цены
                </label>
                <input
                  type="color"
                  value={card.oldPriceColor}
                  onChange={(e) =>
                    handleInputChange(index, "oldPriceColor", e.target.value)
                  }
                />
              </>
            )}
          </div>
        </div>
      ))}
      <button onClick={addNewCard}>Добавить карточку</button>
    </div>
  );
};

export default EditCards;
