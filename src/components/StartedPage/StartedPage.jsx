import React from "react";
import StartedPageHeader from "./StartedPageHeader/StartedPageHeader";
import StartedPageBody from "./StartedPageBody/StartedPageBody";
import "../StartedPage/StartedPage.module.css";
const StartedPage = () => {
  return (
    <div>
      <StartedPageHeader></StartedPageHeader>
      <StartedPageBody></StartedPageBody>
    </div>
  );
};

export default StartedPage;
