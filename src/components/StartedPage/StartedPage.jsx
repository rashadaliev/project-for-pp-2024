import React from "react";
import StartedPageHeader from "./StartedPageHeader/StartedPageHeader";
import StartedPageBody from "./StartedPageBody/StartedPageBody";
import styles from "../StartedPage/StartedPage.module.css";
import { useState, useEffect } from "react";
const StartedPage = () => {
  return (
    <div className={styles.fon}>
      <StartedPageHeader></StartedPageHeader>
      <StartedPageBody></StartedPageBody>
    </div>
  );
};

export default StartedPage;
