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
    };
    setTempCards([...tempCards, newCard]);
    setCards([...tempCards, newCard]);
  };

  const handleColorChange = (index, field, newColor) => {
    const newTempCards = [...tempCards];
    newTempCards[index][field] = newColor;
    setTempCards(newTempCards);
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

  const handleFileChange = (index, event) => {
    const newTempCards = [...tempCards];
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newTempCards[index]["image"] = reader.result;
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
              onChange={(e) => handleFileChange(index, e)}
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
                <ChromePicker
                  width="200px"
                  color={card.strikeThroughColor}
                  onChange={(color) =>
                    handleColorChange(index, "strikeThroughColor", color.hex)
                  }
                />

                <label
                  htmlFor={`card-oldPriceColor-${index}`}
                  className={styles["color-old-price"]}
                >
                  Цвет старой цены
                </label>
                <ChromePicker
                  width="200px"
                  color={card.oldPriceColor}
                  onChange={(color) =>
                    handleColorChange(index, "oldPriceColor", color.hex)
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
