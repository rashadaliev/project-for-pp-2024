import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "../EditModal/EditModal.module.css";
import EditHeader from "./EditHeader/EditHeader";
import EditCards from "./EditCards/EditCards";
import EditAboutStore from "./EditAboutStore/EditAboutStore";
import EditLinks from "./EditLinks/EditLinks";
import EditFooter from "./EditFooter/EditFooter";
import EditInformationQA from "./EditInformationQA/EditInformationQA";
const EditModal = (props) => {
  const {
    openModal,
    close,
    updateImage,
    selectedElementId,
    cards,
    setCards,
    info,
    setInfo,
    links,
    setLinks,
    footer,
    setFooter,
    infoQA,
    setInfoQA,
  } = props;

  const renderEditForm = () => {
    switch (selectedElementId) {
      case "block-header":
        return <EditHeader updateImage={updateImage}></EditHeader>;
      case "block-cards":
        return <EditCards cards={cards} setCards={setCards}></EditCards>;
      case "block-info":
        return <EditAboutStore info={info} setInfo={setInfo}></EditAboutStore>;
      case "block-infoQA":
        return (
          <EditInformationQA
            infoQA={infoQA}
            setInfoQA={setInfoQA}
          ></EditInformationQA>
        );
      case "block-links":
        return <EditLinks links={links} setLinks={setLinks}></EditLinks>;
      case "block-footer":
        return <EditFooter footer={footer} setFooter={setFooter}></EditFooter>;
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
