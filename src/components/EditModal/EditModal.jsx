import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "../EditModal/EditModal.module.css";
import EditHeader from "./EditHeader/EditHeader";
import EditCards from "./EditCards/EditCards";
const EditModal = (props) => {
  const { openModal, close, updateImage, selectedElementId, cards, setCards } =
    props;

  const renderEditForm = () => {
    switch (selectedElementId) {
      case "block-header":
        return <EditHeader updateImage={updateImage}></EditHeader>;
      case "block-cards":
        return <EditCards cards={cards} setCards={setCards}></EditCards>;
      default:
        return "";
    }
  };
  return (
    <div
      className={classNames(styles["modal-container"], {
        [styles.open]: openModal,
      })}
      onClick={close}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {renderEditForm()}
      </div>
    </div>
  );
};

export default EditModal;
