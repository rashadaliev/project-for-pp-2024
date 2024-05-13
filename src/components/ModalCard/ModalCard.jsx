import React from "react";
import styles from "../ModalCard/ModalCard.module.css";
import classNames from "classnames";
const ModalCard = (props) => {
  const { openCardModal, close, card } = props;
  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: openCardModal,
      })}
      onClick={close}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div>{card.name}</div>
        <div>{card.desc}</div>
        <div>{card.price}</div>
        <div>
          <img src={card.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
