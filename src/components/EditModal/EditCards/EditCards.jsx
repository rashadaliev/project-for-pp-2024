import React, { useEffect } from "react";
import styles from "../EditCards/EditCards.module.css";
import { useState } from "react";

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
    };
    setTempCards([...tempCards, newCard]);
    setCards([...tempCards, newCard]);
  };

  const saveChanges = () => {
    setCards(tempCards);
  };

  const handleInputChange = (index, field, newValue) => {
    const newTempCards = [...tempCards];
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

            <label htmlFor={`card-desc-${index}`}>Описание</label>
            <input
              type="text"
              value={card.desc}
              id={`card-desc-${index}`}
              onChange={(e) => handleInputChange(index, "desc", e.target.value)}
            />
          </div>
        </div>
      ))}
      <button onClick={addNewCard}>Добавить</button>
    </div>
  );
};

export default EditCards;
