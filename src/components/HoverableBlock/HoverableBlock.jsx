import React from "react";
import { useState } from "react";
import styles from "../HoverableBlock/HoverableBlock.module.css";
const HoverableBlock = (props) => {
  const { children, setOpenModal } = props;
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };
  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };
  const handleClick = () => {
    const elementId = children.props["data-id"];
    setOpenModal(true, elementId);
  };
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isButtonVisible && (
        <button className={styles["btn-edit"]} onClick={handleClick}>
          Редактировать
        </button>
      )}
      {children}
    </div>
  );
};

export default HoverableBlock;
